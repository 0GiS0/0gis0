const Parser = require('rss-parser');
const fetch = require('node-fetch');
const fs = require('fs');

class ContentFetcher {
  constructor() {
    this.parser = new Parser();
  }

  extractVideoId(url) {
    // Extract video ID from YouTube URL
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
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
          const posts = feed.items.slice(0, limit).map(item => {
            // Try to extract image from enclosure, content, or use a fallback
            let thumbnail = null;
            
            // Check for enclosure (common in RSS feeds for images)
            if (item.enclosure && item.enclosure.url) {
              thumbnail = item.enclosure.url;
            }
            
            // Check for image in content
            if (!thumbnail && item.content) {
              const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
              if (imgMatch) {
                thumbnail = imgMatch[1];
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
          });
          
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
        description: "Cómo implementar pipelines eficientes para tus proyectos",
        thumbnail: "https://via.placeholder.com/600x400/339933/ffffff?text=CI%2FCD+Automation"
      },
      {
        title: "Microservicios en Azure: Arquitectura y mejores prácticas",
        link: "https://www.returngis.net",
        publishDate: "5 de diciembre de 2024",
        description: "Diseña sistemas escalables y resilientes en la nube",
        thumbnail: "https://via.placeholder.com/600x400/0078d4/ffffff?text=Azure+Microservices"
      },
      {
        title: "Monitoreo y observabilidad en aplicaciones modernas",
        link: "https://www.returngis.net",
        publishDate: "28 de noviembre de 2024",
        description: "Herramientas y técnicas para mantener tus apps saludables",
        thumbnail: "https://via.placeholder.com/600x400/ff6b35/ffffff?text=Monitoring+%26+Observability"
      }
    ];
  }

  generateVideoSection(videos) {
    if (!videos || videos.length === 0) {
      return '<!-- No hay vídeos disponibles -->';
    }

    let section = '\n## 🎥 Mis últimos vídeos en YouTube\n\n';
    
    videos.forEach(video => {
      section += `<div align="center">\n\n`;
      if (video.thumbnail) {
        section += `[![${video.title}](${video.thumbnail})](${video.link})\n\n`;
      }
      section += `### [${video.title}](${video.link})\n`;
      section += `📅 ${video.publishDate}\n\n`;
      if (video.description) {
        section += `${video.description}\n\n`;
      }
      section += `</div>\n\n---\n\n`;
    });
    
    section += '<div align="center">\n\n';
    section += '[![YouTube Channel](https://img.shields.io/badge/Ver%20todos%20los%20vídeos-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/@returngis)\n\n';
    section += '</div>\n\n';
    
    return section;
  }

  generateBlogSection(posts) {
    if (!posts || posts.length === 0) {
      return '<!-- No hay artículos disponibles -->';
    }

    let section = '\n## 📝 Mis últimos artículos en el blog\n\n';
    
    posts.forEach(post => {
      section += `<div align="center">\n\n`;
      if (post.thumbnail) {
        section += `[![${post.title}](${post.thumbnail})](${post.link})\n\n`;
      }
      section += `### [${post.title}](${post.link})\n`;
      section += `📅 ${post.publishDate}\n\n`;
      if (post.description) {
        section += `${post.description}\n\n`;
      }
      section += `</div>\n\n---\n\n`;
    });
    
    section += '<div align="center">\n\n';
    section += '[![Blog](https://img.shields.io/badge/Ver%20todos%20los%20artículos-339933?style=for-the-badge&logo=github-pages&logoColor=white)](https://www.returngis.net)\n\n';
    section += '</div>\n\n';
    
    return section;
  }
}

module.exports = ContentFetcher;