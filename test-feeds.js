const ContentFetcher = require('./content-fetcher');

async function testFeeds() {
  console.log('🧪 Probando las fuentes de contenido...\n');
  
  const fetcher = new ContentFetcher();
  
  console.log('=== YouTube Videos ===');
  try {
    const videos = await fetcher.getYouTubeVideos();
    if (videos.length > 0) {
      console.log('✅ YouTube feed funcionando');
      videos.forEach((video, i) => {
        console.log(`${i + 1}. ${video.title}`);
        console.log(`   📅 ${video.publishDate}`);
        console.log(`   🔗 ${video.link}\n`);
      });
    } else {
      console.log('⚠️  No se encontraron vídeos');
    }
  } catch (error) {
    console.log('❌ Error con YouTube:', error.message);
  }
  
  console.log('\n=== Blog Posts ===');
  try {
    const posts = await fetcher.getBlogPosts();
    if (posts.length > 0) {
      console.log('✅ Blog feed funcionando');
      posts.forEach((post, i) => {
        console.log(`${i + 1}. ${post.title}`);
        console.log(`   📅 ${post.publishDate}`);
        console.log(`   🔗 ${post.link}\n`);
      });
    } else {
      console.log('⚠️  No se encontraron artículos');
    }
  } catch (error) {
    console.log('❌ Error con blog:', error.message);
  }
}

if (require.main === module) {
  testFeeds().catch(console.error);
}

module.exports = testFeeds;