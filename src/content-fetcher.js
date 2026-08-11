const Parser = require('rss-parser');
const fs = require('fs');
const path = require('path');

// Cache file used to remember the last successfully fetched blog posts
// (including their real thumbnails) so that, if a future fetch fails
// (e.g. because the blog's RSS feed is temporarily malformed), we can
// fall back to real, recent content instead of fake placeholder data.
const BLOG_POSTS_CACHE_FILE = path.join(__dirname, 'last-known-posts.json');

// Checks whether a URL points to a WordPress emoji image (typically hosted
// on s.w.org's CDN) so that such images can be excluded when looking for a
// real featured/thumbnail image. The host is validated using proper URL
// parsing (instead of a raw substring match) to avoid being bypassed by
// URLs that merely contain "s.w.org" somewhere in the path or query string.
function isEmojiImageUrl(url) {
  if (!url) {
    return false;
  }

  if (url.includes('emoji')) {
    return true;
  }

  try {
    const { hostname } = new URL(url);
    return hostname === 's.w.org' || hostname.endsWith('.s.w.org');
  } catch (error) {
    // If the URL can't be parsed, fall back to treating it as non-emoji.
    return false;
  }
}

class ContentFetcher {
  constructor() {
    this.parser = new Parser({
      customFields: {
        item: [
          'media:content',
          'media:thumbnail',
          'content:encoded',
          'wp:featured_media',
          'media:group',
          'enclosure',
          'yt:videoId'
        ]
      }
    });
  }

  // Some WordPress feeds occasionally include stray, unescaped "&"
  // characters outside of CDATA sections (e.g. injected by ads/tracking
  // plugins), which makes the feed invalid XML and breaks parsing with
  // errors like "Invalid character in entity name". To make parsing more
  // resilient, escape bare "&" characters that are not part of a valid
  // XML entity, while leaving CDATA sections untouched (their content is
  // treated as literal text by the XML parser, so it doesn't need - and
  // must not get - entity escaping).
  sanitizeXml(xml) {
    const parts = xml.split(/(<!\[CDATA\[[\s\S]*?\]\]>)/g);
    return parts
      .map(part => {
        if (part.startsWith('<![CDATA[')) {
          return part;
        }
        return part.replace(/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9a-fA-F]+;)/g, '&amp;');
      })
      .join('');
  }

  async fetchAndParseFeed(rssUrl) {
    const response = await fetch(rssUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} fetching ${rssUrl}`);
    }
    const rawXml = await response.text();
    try {
      return await this.parser.parseString(rawXml);
    } catch (error) {
      // Retry once with sanitized XML in case the failure was caused by
      // stray unescaped ampersands in the feed.
      console.log(`Initial parse failed for ${rssUrl} (${error.message}), retrying with sanitized XML...`);
      return await this.parser.parseString(this.sanitizeXml(rawXml));
    }
  }

  loadCachedBlogPosts() {
    try {
      if (fs.existsSync(BLOG_POSTS_CACHE_FILE)) {
        const cached = JSON.parse(fs.readFileSync(BLOG_POSTS_CACHE_FILE, 'utf8'));
        if (Array.isArray(cached) && cached.length > 0) {
          console.log('Using cached blog posts from last successful fetch');
          return cached;
        }
      }
    } catch (error) {
      console.log(`Could not read cached blog posts: ${error.message}`);
    }
    return null;
  }

  saveCachedBlogPosts(posts) {
    try {
      fs.writeFileSync(BLOG_POSTS_CACHE_FILE, JSON.stringify(posts, null, 2), 'utf8');
    } catch (error) {
      console.log(`Could not save cached blog posts: ${error.message}`);
    }
  }

  extractVideoId(url) {
    // Extract video ID from YouTube URL (supports regular videos and shorts)
    // This is used as a fallback when yt:videoId field is not available in RSS feed
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtube\.com\/shorts\/|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  }

  isShort(url) {
    // Check if the URL is a YouTube Short
    return url.includes('/shorts/');
  }

  async extractWordPressImage(item) {
    // Try multiple methods to extract WordPress featured image
    // Priority: RSS feeds fields first, then Open Graph (featured image), then content fallback
    let thumbnail = null;
    
    // Method 1: WordPress media namespace (most reliable for WordPress)
    if (item['media:content']) {
      if (Array.isArray(item['media:content'])) {
        // If it's an array, get the first image
        const imageContent = item['media:content'].find(media => 
          media.$ && media.$.type && media.$.type.startsWith('image/')
        );
        if (imageContent && imageContent.$.url) {
          thumbnail = imageContent.$.url;
          console.log(`Found media:content thumbnail: ${thumbnail}`);
        }
      } else if (item['media:content'].$ && item['media:content'].$.url) {
        thumbnail = item['media:content'].$.url;
        console.log(`Found media:content thumbnail: ${thumbnail}`);
      }
    }
    
    // Method 2: WordPress thumbnail namespace
    if (!thumbnail && item['media:thumbnail'] && item['media:thumbnail'].$ && item['media:thumbnail'].$.url) {
      thumbnail = item['media:thumbnail'].$.url;
      console.log(`Found media:thumbnail: ${thumbnail}`);
    }
    
    // Method 3: Check for WordPress featured image in custom fields
    if (!thumbnail && item['wp:featured_media']) {
      thumbnail = item['wp:featured_media'];
      console.log(`Found wp:featured_media: ${thumbnail}`);
    }
    
    // Method 4: Try to fetch Open Graph image from the article URL (featured image - high priority)
    if (!thumbnail && item.link) {
      try {
        const response = await fetch(item.link);
        const html = await response.text();
        
        // First priority: Open Graph image (this is the featured image in WordPress)
        const ogImageMatch = html.match(/<meta[^>]+property="og:image"[^>]+content="([^">]+)"/i);
        if (ogImageMatch) {
          thumbnail = ogImageMatch[1];
          console.log(`Found Open Graph image (featured image): ${thumbnail}`);
        }
        
        // Second priority: Try to find featured-image div in the actual page
        if (!thumbnail) {
          const featuredImageMatch = html.match(/<div[^>]+class="[^"]*featured-image[^"]*"[^>]*>(.*?)<\/div>/is);
          if (featuredImageMatch) {
            const featuredImageContent = featuredImageMatch[1];
            const imgMatch = featuredImageContent.match(/<img[^>]+src="([^">]+)"/);
            if (imgMatch && !isEmojiImageUrl(imgMatch[1])) {
              thumbnail = imgMatch[1];
              console.log(`Found featured-image div in page: ${thumbnail}`);
            }
          }
        }
      } catch (error) {
        // Silently fail if we can't fetch the page
        console.log(`Could not fetch page content for ${item.link}: ${error.message}`);
      }
    }
    
    // Method 5: Extract from content:encoded as fallback (WordPress full content)
    if (!thumbnail && item['content:encoded']) {
      // First, try to find image in featured-image div
      const featuredImageMatch = item['content:encoded'].match(/<div[^>]+class="[^"]*featured-image[^"]*"[^>]*>(.*?)<\/div>/is);
      if (featuredImageMatch) {
        const featuredImageContent = featuredImageMatch[1];
        const imgMatch = featuredImageContent.match(/<img[^>]+src="([^">]+)"/);
        if (imgMatch && !isEmojiImageUrl(imgMatch[1])) {
          thumbnail = imgMatch[1];
          console.log(`Found featured-image div in content:encoded: ${thumbnail}`);
        }
      }
      
      // If not found in featured-image div, look for the first non-emoji image in the full content
      if (!thumbnail) {
        const imgMatches = item['content:encoded'].match(/<img[^>]+src="([^">]+)"/g);
        if (imgMatches) {
          for (const match of imgMatches) {
            const srcMatch = match.match(/src="([^">]+)"/);
            if (srcMatch && !isEmojiImageUrl(srcMatch[1])) {
              thumbnail = srcMatch[1];
              console.log(`Found fallback image in content: ${thumbnail}`);
              break;
            }
          }
        }
      }
    }
    
    return thumbnail;
  }

  async getYouTubeVideos(channelId = '@returngis', limit = 3) {
    try {
      // YouTube RSS feed URL
      const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=UC140iBrEZbOtvxWsJ-Tb0lQ`;
      console.log('Fetching YouTube videos...');
      
      const feed = await this.parser.parseURL(rssUrl);
      const videos = feed.items.slice(0, limit).map(item => {
        // Extract video ID: prioritize yt:videoId field from RSS feed, fallback to URL extraction
        const videoId = item['yt:videoId'] || this.extractVideoId(item.link);
        // Use mqdefault as it works for both regular videos and shorts
        const thumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : null;
        
        // Check if it's a short based on the title (shorts often have #shorts)
        const isShort = item.title && item.title.toLowerCase().includes('#shorts');
        // Build the appropriate link (convert to shorts URL if it's a short)
        const link = isShort && videoId ? `https://www.youtube.com/shorts/${videoId}` : item.link;
        
        return {
          title: item.title,
          link: link,
          publishDate: new Date(item.pubDate).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          description: item.contentSnippet || item.content || '',
          thumbnail: thumbnail,
          isShort: isShort
        };
      });
      
      console.log(`Found ${videos.length} YouTube videos`);
      return videos;
    } catch (error) {
      console.error('Error fetching YouTube videos:', error.message);
      // Return fallback content when network is unavailable
      return this.getFallbackVideos();
    }
  }

  getFallbackVideos() {
    return [
      {
        title: "Cómo crear workflows de GitHub Actions - Tutorial completo",
        link: "https://www.youtube.com/@returngis",
        publishDate: "15 de diciembre de 2024",
        description: "Aprende a automatizar tu workflow con GitHub Actions paso a paso",
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
      },
      {
        title: "Infraestructura como código con Terraform y Azure",
        link: "https://www.youtube.com/@returngis",
        publishDate: "8 de diciembre de 2024",
        description: "Domina Terraform para gestionar tu infraestructura en Azure",
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
      },
      {
        title: "Docker y Kubernetes para desarrolladores",
        link: "https://www.youtube.com/@returngis",
        publishDate: "1 de diciembre de 2024",
        description: "Containeriza y orquesta tus aplicaciones como un profesional",
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
      }
    ];
  }

  async getBlogPosts(blogUrl = 'https://www.returngis.net', limit = 3) {
    try {
      // Try common RSS feed URLs
      const rssUrls = [
        `${blogUrl}/feed/`,
        `${blogUrl}/rss/`,
        `${blogUrl}/feed.xml`,
        `${blogUrl}/rss.xml`
      ];
      
      console.log('Fetching blog posts...');
      
      for (const rssUrl of rssUrls) {
        try {
          const feed = await this.fetchAndParseFeed(rssUrl);
          const posts = await Promise.all(feed.items.slice(0, limit).map(async (item) => {
            // Use the specialized WordPress image extraction method
            let thumbnail = await this.extractWordPressImage(item);
            
            // Log what we found for debugging
            if (thumbnail) {
              console.log(`Found thumbnail for "${item.title}": ${thumbnail}`);
            } else {
              console.log(`No thumbnail found for "${item.title}", trying fallback methods...`);
            }
            
            // Additional fallback methods if the specialized method didn't work
            if (!thumbnail) {
              // Check for enclosure (common in RSS feeds for images)
              if (item.enclosure && item.enclosure.url) {
                thumbnail = item.enclosure.url;
              }
              
              // Check for featured-image div in regular content
              if (!thumbnail && item.content) {
                const featuredImageMatch = item.content.match(/<div[^>]+class="[^"]*featured-image[^"]*"[^>]*>(.*?)<\/div>/is);
                if (featuredImageMatch) {
                  const featuredImageContent = featuredImageMatch[1];
                  const imgMatch = featuredImageContent.match(/<img[^>]+src="([^">]+)"/);
                  if (imgMatch && !isEmojiImageUrl(imgMatch[1])) {
                    thumbnail = imgMatch[1];
                    console.log(`Found featured-image in fallback content: ${thumbnail}`);
                  }
                }
              }
              
              // Check for non-emoji image in regular content (if not found in featured-image)
              if (!thumbnail && item.content) {
                const imgMatches = item.content.match(/<img[^>]+src="([^">]+)"/g);
                if (imgMatches) {
                  for (const match of imgMatches) {
                    const srcMatch = match.match(/src="([^">]+)"/);
                    if (srcMatch && !isEmojiImageUrl(srcMatch[1])) {
                      thumbnail = srcMatch[1];
                      break;
                    }
                  }
                }
              }
              
              // Try to extract from description/summary
              if (!thumbnail && item.summary) {
                const imgMatch = item.summary.match(/<img[^>]+src="([^">]+)"/);
                if (imgMatch) {
                  thumbnail = imgMatch[1];
                }
              }
            }
            
            // Fallback to a generic blog image (placehold.co is a maintained
            // service; the previously used via.placeholder.com is defunct
            // and produces broken images)
            if (!thumbnail) {
              thumbnail = "https://placehold.co/600x400/339933/ffffff?text=Blog+Post";
            }
            
            return {
              title: item.title,
              link: item.link,
              publishDate: new Date(item.pubDate).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }),
              description: item.contentSnippet || item.content || '',
              thumbnail: thumbnail
            };
          }));
          
          console.log(`Found ${posts.length} blog posts from ${rssUrl}`);
          this.saveCachedBlogPosts(posts);
          return posts;
        } catch (e) {
          console.log(`Failed to fetch from ${rssUrl}: ${e.message}`);
        }
      }
      
      throw new Error('No valid RSS feed found');
    } catch (error) {
      console.error('Error fetching blog posts:', error.message);
      // Prefer real posts (with real thumbnails) from the last successful
      // fetch over hardcoded fake content, so images are never broken.
      const cachedPosts = this.loadCachedBlogPosts();
      if (cachedPosts) {
        return cachedPosts;
      }
      // Return fallback content when no cache is available either
      return this.getFallbackPosts();
    }
  }

  getFallbackPosts() {
    return [
      {
        title: "Automatización CI/CD con GitHub Actions y Azure DevOps",
        link: "https://www.returngis.net",
        publishDate: "12 de diciembre de 2024",
        description: "Cómo implementar pipelines eficientes para tus proyectos con las mejores prácticas de la industria.",
        thumbnail: "https://placehold.co/600x400/339933/ffffff?text=CI%2FCD+Automation"
      },
      {
        title: "Microservicios en Azure: Arquitectura y mejores prácticas",
        link: "https://www.returngis.net",
        publishDate: "5 de diciembre de 2024",
        description: "Diseña sistemas escalables y resilientes en la nube con patrones modernos de arquitectura.",
        thumbnail: "https://placehold.co/600x400/0078d4/ffffff?text=Azure+Microservices"
      },
      {
        title: "Monitoreo y observabilidad en aplicaciones modernas",
        link: "https://www.returngis.net",
        publishDate: "28 de noviembre de 2024",
        description: "Herramientas y técnicas para mantener tus aplicaciones saludables y monitoreadas.",
        thumbnail: "https://placehold.co/600x400/ff6b35/ffffff?text=Monitoring+%26+Observability"
      }
    ];
  }

  generateVideoSection(videos) {
    if (!videos || videos.length === 0) {
      return '<!-- No hay vídeos disponibles -->';
    }

    let section = '\n## 🎥 Mis últimos vídeos en YouTube\n\n';
    section += '<div align="center">\n\n';
    section += '<table>\n<tr>\n';
    
    videos.forEach(video => {
      section += `<td align="center" width="33%">\n`;
      if (video.thumbnail) {
        section += `<a href="${video.link}">\n`;
        section += `<img src="${video.thumbnail}" alt="${video.title}" width="280"/>\n`;
        section += `</a>\n`;
      }
      section += `<br/>\n`;
      section += `<a href="${video.link}"><strong>${video.title}</strong></a>\n`;
      section += `<br/>\n`;
      section += `<sub>📅 ${video.publishDate}</sub>\n`;
      section += `</td>\n`;
    });
    
    section += '</tr>\n</table>\n\n';
    section += '[![YouTube Channel](https://img.shields.io/badge/Ver%20todos%20los%20vídeos-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/@returngis)\n\n';
    section += '</div>\n\n';
    
    return section;
  }

  generateBlogSection(posts) {
    if (!posts || posts.length === 0) {
      return '<!-- No hay artículos disponibles -->';
    }

    let section = '\n## 📝 Mis últimos artículos en el blog\n\n';
    section += '<div align="center">\n\n';
    section += '<table>\n<tr>\n';
    
    posts.forEach(post => {
      section += `<td align="center" width="33%">\n`;
      if (post.thumbnail) {
        section += `<a href="${post.link}">\n`;
        section += `<img src="${post.thumbnail}" alt="${post.title}" width="280" height="158"/>\n`;
        section += `</a>\n`;
      }
      section += `<br/>\n`;
      section += `<a href="${post.link}"><strong>${post.title}</strong></a>\n`;
      section += `<br/>\n`;
      section += `<sub>📅 ${post.publishDate}</sub>\n`;
      section += `</td>\n`;
    });
    
    section += '</tr>\n</table>\n\n';
    section += '[![Blog](https://img.shields.io/badge/Ver%20todos%20los%20artículos-339933?style=for-the-badge&logo=github-pages&logoColor=white)](https://www.returngis.net)\n\n';
    section += '</div>\n\n';
    
    return section;
  }
}

module.exports = ContentFetcher;