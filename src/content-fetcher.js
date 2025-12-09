const Parser = require('rss-parser');
const fs = require('fs');

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
          'enclosure'
        ]
      }
    });
  }

  extractVideoId(url) {
    // Extract video ID from YouTube URL
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
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
            if (imgMatch && !imgMatch[1].includes('emoji') && !imgMatch[1].includes('s.w.org')) {
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
        if (imgMatch && !imgMatch[1].includes('emoji') && !imgMatch[1].includes('s.w.org')) {
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
            if (srcMatch && !srcMatch[1].includes('emoji') && !srcMatch[1].includes('s.w.org')) {
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
        // Extract video ID from YouTube link to generate thumbnail
        const videoId = this.extractVideoId(item.link);
        const thumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
        
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
          const feed = await this.parser.parseURL(rssUrl);
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
                  if (imgMatch && !imgMatch[1].includes('emoji') && !imgMatch[1].includes('s.w.org')) {
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
                    if (srcMatch && !srcMatch[1].includes('emoji') && !srcMatch[1].includes('s.w.org')) {
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
            
            // Fallback to a generic blog image
            if (!thumbnail) {
              thumbnail = "https://via.placeholder.com/600x400/339933/ffffff?text=Blog+Post";
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
          return posts;
        } catch (e) {
          console.log(`Failed to fetch from ${rssUrl}: ${e.message}`);
        }
      }
      
      throw new Error('No valid RSS feed found');
    } catch (error) {
      console.error('Error fetching blog posts:', error.message);
      // Return fallback content when network is unavailable
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
        thumbnail: "https://via.placeholder.com/600x400/339933/ffffff?text=CI%2FCD+Automation"
      },
      {
        title: "Microservicios en Azure: Arquitectura y mejores prácticas",
        link: "https://www.returngis.net",
        publishDate: "5 de diciembre de 2024",
        description: "Diseña sistemas escalables y resilientes en la nube con patrones modernos de arquitectura.",
        thumbnail: "https://via.placeholder.com/600x400/0078d4/ffffff?text=Azure+Microservices"
      },
      {
        title: "Monitoreo y observabilidad en aplicaciones modernas",
        link: "https://www.returngis.net",
        publishDate: "28 de noviembre de 2024",
        description: "Herramientas y técnicas para mantener tus aplicaciones saludables y monitoreadas.",
        thumbnail: "https://via.placeholder.com/600x400/ff6b35/ffffff?text=Monitoring+%26+Observability"
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
      // Use medium quality thumbnail (320x180) instead of maxresdefault for compact display
      const smallThumbnail = video.thumbnail ? video.thumbnail.replace('maxresdefault.jpg', 'mqdefault.jpg') : null;
      
      section += `<td align="center" width="33%">\n`;
      if (smallThumbnail) {
        section += `<a href="${video.link}">\n`;
        section += `<img src="${smallThumbnail}" alt="${video.title}" width="280"/>\n`;
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