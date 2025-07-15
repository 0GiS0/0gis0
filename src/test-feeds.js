const ContentFetcher = require('./content-fetcher');

async function testFeeds() {
  console.log('\ud83e\uddea Probando las fuentes de contenido...\n');
  
  const fetcher = new ContentFetcher();
  
  console.log('=== YouTube Videos ===');
  try {
    const videos = await fetcher.getYouTubeVideos();
    if (videos.length > 0) {
      console.log('\u2705 YouTube feed funcionando');
      videos.forEach((video, i) => {
        console.log(`${i + 1}. ${video.title}`);
        console.log(`   \ud83d\udcc5 ${video.publishDate}`);
        console.log(`   \ud83d\udd17 ${video.link}\n`);
      });
    } else {
      console.log('\u26a0\ufe0f  No se encontraron v\u00eddeos');
    }
  } catch (error) {
    console.log('\u274c Error con YouTube:', error.message);
  }
  
  console.log('\n=== Blog Posts ===');
  try {
    const posts = await fetcher.getBlogPosts();
    if (posts.length > 0) {
      console.log('\u2705 Blog feed funcionando');
      posts.forEach((post, i) => {
        console.log(`${i + 1}. ${post.title}`);
        console.log(`   \ud83d\udcc5 ${post.publishDate}`);
        console.log(`   \ud83d\udd17 ${post.link}\n`);
      });
    } else {
      console.log('\u26a0\ufe0f  No se encontraron art\u00edculos');
    }
  } catch (error) {
    console.log('\u274c Error con blog:', error.message);
  }
}

if (require.main === module) {
  testFeeds().catch(console.error);
}

module.exports = testFeeds;
