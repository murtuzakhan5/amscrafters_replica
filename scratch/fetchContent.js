const cheerio = require('cheerio');
const fs = require('fs');

async function scrape() {
  const urls = [
    'https://amscrafters.io/services/mobile-app',
    'https://amscrafters.io/services/crm-solutions',
    'https://amscrafters.io/services/social-media-marketing',
    'https://amscrafters.io/services/shopify',
    'https://amscrafters.io/services/ecommerce',
    'https://amscrafters.io/services/seo'
  ];

  const results = {};

  for (const url of urls) {
    try {
      console.log(`Fetching ${url}...`);
      const response = await fetch(url);
      const html = await response.text();
      const $ = cheerio.load(html);

      const slug = url.split('/').pop();
      
      // Attempt to extract title from the hero section (h1)
      const h1Text = $('h1').text().replace(/\s+/g, ' ').trim();
      
      // Subtitle is usually the paragraph immediately following the h1 or within the hero
      const p1 = $('h1').parent().find('p').first().text().replace(/\s+/g, ' ').trim();
      const p2 = $('h1').parent().find('p').eq(1).text().replace(/\s+/g, ' ').trim();
      
      // Features: let's try to extract from cards. Usually they have h3 for feature titles.
      const features = [];
      $('h3').each((i, el) => {
        const title = $(el).text().replace(/\s+/g, ' ').trim();
        const desc = $(el).next('p').text().replace(/\s+/g, ' ').trim();
        if (title && desc) {
          features.push({ title, desc });
        }
      });
      
      results[slug] = {
        title: h1Text,
        subtitle: p1,
        overview: p2,
        features: features.slice(0, 4) // grab first 4 features to match design
      };
    } catch (e) {
      console.error(`Error fetching ${url}:`, e);
    }
  }

  fs.writeFileSync('scraped.json', JSON.stringify(results, null, 2));
  console.log('Done! Saved to scraped.json');
}

scrape();
