const Parser = require('rss-parser');

// Create a mock YouTube RSS feed response to test parsing
const mockRssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns:yt="http://www.youtube.com/xml/schemas/2015" xmlns:media="http://search.yahoo.com/mrss/" xmlns="http://www.w3.org/2005/Atom">
  <link rel="self" href="http://www.youtube.com/feeds/videos.xml?channel_id=UC140iBrEZbOtvxWsJ-Tb0lQ"/>
  <id>yt:channel:UC140iBrEZbOtvxWsJ-Tb0lQ</id>
  <yt:channelId>UC140iBrEZbOtvxWsJ-Tb0lQ</yt:channelId>
  <title>return(GiS);</title>
  <link rel="alternate" href="https://www.youtube.com/channel/UC140iBrEZbOtvxWsJ-Tb0lQ"/>
  <author>
    <name>return(GiS);</name>
    <uri>https://www.youtube.com/channel/UC140iBrEZbOtvxWsJ-Tb0lQ</uri>
  </author>
  <published>2013-07-02T08:52:17+00:00</published>

  <entry>
    <id>yt:video:F9SWj3ljqIk</id>
    <yt:videoId>F9SWj3ljqIk</yt:videoId>
    <yt:channelId>UC140iBrEZbOtvxWsJ-Tb0lQ</yt:channelId>
    <title>Comparte tu VS Code como un PRO 💎 Screencast Mode 🚀</title>
    <link rel="alternate" href="https://www.youtube.com/watch?v=F9SWj3ljqIk"/>
    <author>
      <name>return(GiS);</name>
      <uri>https://www.youtube.com/channel/UC140iBrEZbOtvxWsJ-Tb0lQ</uri>
    </author>
    <published>2026-02-11T09:00:00+00:00</published>
    <updated>2026-02-11T09:10:26+00:00</updated>
    <media:group>
      <media:title>Comparte tu VS Code como un PRO 💎 Screencast Mode 🚀</media:title>
      <media:content url="https://www.youtube.com/v/F9SWj3ljqIk?version=3" type="application/x-shockwave-flash" width="640" height="390"/>
      <media:thumbnail url="https://i.ytimg.com/vi/F9SWj3ljqIk/hqdefault.jpg" width="480" height="360"/>
      <media:description>En este video...</media:description>
      <media:community>
        <media:starRating count="100" average="5.00" min="1" max="5"/>
        <media:statistics views="1234"/>
      </media:community>
    </media:group>
  </entry>

  <entry>
    <id>yt:video:AeaMNYddZTE</id>
    <yt:videoId>AeaMNYddZTE</yt:videoId>
    <yt:channelId>UC140iBrEZbOtvxWsJ-Tb0lQ</yt:channelId>
    <title>🚀 MCP Apps en VS Code Insiders: crea y ejecuta tu primera app</title>
    <link rel="alternate" href="https://www.youtube.com/watch?v=AeaMNYddZTE"/>
    <author>
      <name>return(GiS);</name>
      <uri>https://www.youtube.com/channel/UC140iBrEZbOtvxWsJ-Tb0lQ</uri>
    </author>
    <published>2026-02-04T09:00:00+00:00</published>
    <updated>2026-02-04T09:10:26+00:00</updated>
    <media:group>
      <media:title>🚀 MCP Apps en VS Code Insiders: crea y ejecuta tu primera app</media:title>
      <media:content url="https://www.youtube.com/v/AeaMNYddZTE?version=3" type="application/x-shockwave-flash" width="640" height="390"/>
      <media:thumbnail url="https://i.ytimg.com/vi/AeaMNYddZTE/hqdefault.jpg" width="480" height="360"/>
      <media:description>En este video...</media:description>
      <media:community>
        <media:starRating count="150" average="5.00" min="1" max="5"/>
        <media:statistics views="2345"/>
      </media:community>
    </media:group>
  </entry>
</feed>`;

async function testRssParsing() {
  const parser = new Parser({
    customFields: {
      item: [
        'media:content',
        'media:thumbnail',
        'media:group',
        'yt:videoId'
      ]
    }
  });

  try {
    const feed = await parser.parseString(mockRssFeed);

    console.log('Feed title:', feed.title);
    console.log('Number of items:', feed.items.length);
    console.log('\n=== Parsing Results ===\n');

    feed.items.forEach((item, index) => {
      console.log(`Video ${index + 1}:`);
      console.log('  Title:', item.title);
      console.log('  Link:', item.link);
      console.log('  PubDate:', item.pubDate);
      console.log('  yt:videoId:', item['yt:videoId']);
      console.log('  media:group:', JSON.stringify(item['media:group'], null, 2));

      // Test the extractVideoId function
      const extractVideoId = (url) => {
        const match = url.match(/(?:youtube\.com\/watch\?v=|youtube\.com\/shorts\/|youtu\.be\/)([^&\n?#]+)/);
        return match ? match[1] : null;
      };

      const videoId = extractVideoId(item.link);
      console.log('  Extracted Video ID from link:', videoId);
      console.log('  Thumbnail URL (current method):', `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`);

      // Check if we have yt:videoId field
      if (item['yt:videoId']) {
        console.log('  Thumbnail URL (using yt:videoId):', `https://img.youtube.com/vi/${item['yt:videoId']}/mqdefault.jpg`);
      }

      console.log('---\n');
    });
  } catch (error) {
    console.error('Error parsing RSS:', error);
  }
}

testRssParsing();
