/**
 * Printify Variant Sync & Discovery Utility
 * Run with: node scripts/syncPrintifyVariants.js
 * Requires: PRINTIFY_API_KEY environment variable
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

function printifyRequest(token, endpoint, method = 'GET', postData = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.printify.com',
      port: 443,
      path: endpoint,
      method: method,
      headers: {
        'User-Agent': 'TheLeeParsons-App',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject({ status: res.statusCode, body: parsed });
          }
        } catch (e) {
          reject({ status: res.statusCode, raw: data, error: e });
        }
      });
    });

    req.on('error', (e) => reject(e));
    if (postData) req.write(JSON.stringify(postData));
    req.end();
  });
}

async function main() {
  // Check token from process env or local env files
  let token = process.env.PRINTIFY_API_KEY;
  if (!token) {
    // Try reading from .env.local or .env
    const envPaths = ['.env.local', '.env', '.env.development.local'];
    for (const ep of envPaths) {
      const fullPath = path.join(__dirname, '..', ep);
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const match = content.match(/PRINTIFY_API_KEY=["']?([^"'\r\n]+)/);
        if (match) {
          token = match[1];
          break;
        }
      }
    }
  }

  if (!token) {
    console.error('❌ PRINTIFY_API_KEY not found.');
    console.error('Please set PRINTIFY_API_KEY in your environment or .env.local file.');
    process.exit(1);
  }

  console.log('🔍 Connecting to Printify API...');

  try {
    // 1. Get Shops
    const shops = await printifyRequest(token, '/v1/shops.json');
    console.log(`✅ Connected successfully! Found ${shops.length} shop(s):`);
    shops.forEach(s => console.log(`   - [ID: ${s.id}] ${s.title}`));

    const shopId = process.env.PRINTIFY_SHOP_ID || shops[0]?.id;
    if (!shopId) {
      console.error('❌ No shop found in this Printify account.');
      return;
    }

    console.log(`\n📦 Fetching products for Shop ID: ${shopId}...`);
    const productsRes = await printifyRequest(token, `/v1/shops/${shopId}/products.json`);
    const products = productsRes.data || productsRes;

    console.log(`✅ Found ${products.length} product(s) in shop:\n`);

    const discoveredMap = {
      'shoutout-tee': {},
      'shoutout-hoodie': {},
    };

    for (const prod of products) {
      console.log(`--------------------------------------------------`);
      console.log(`Product: "${prod.title}" (ID: ${prod.id})`);
      const isHoodie = prod.title.toLowerCase().includes('hoodie');
      const prodKey = isHoodie ? 'shoutout-hoodie' : 'shoutout-tee';

      // Inspect variants
      if (Array.isArray(prod.variants)) {
        console.log(`Variants (${prod.variants.length}):`);
        for (const v of prod.variants) {
          if (!v.is_enabled) continue;
          console.log(`   - Variant ID: ${v.id} | Title: "${v.title}" | Price: $${(v.price / 100).toFixed(2)}`);

          // Attempt to parse color and size from variant title (e.g. "Forest Green / L")
          const parts = v.title.split('/').map(p => p.trim());
          if (parts.length >= 2) {
            const rawColor = parts[0].toLowerCase();
            const rawSize = parts[1].toUpperCase();

            let colorKey = 'washed-charcoal';
            if (rawColor.includes('green') || rawColor.includes('forest')) colorKey = 'forest-green';
            else if (rawColor.includes('white') || rawColor.includes('bone')) colorKey = 'vintage-white';

            if (!discoveredMap[prodKey][colorKey]) discoveredMap[prodKey][colorKey] = {};
            discoveredMap[prodKey][colorKey][rawSize] = {
              productId: prod.id,
              variantId: v.id,
              title: v.title,
            };
          }
        }
      }
    }

    console.log(`\n==================================================`);
    console.log(`Discovered Mapping:`);
    console.log(JSON.stringify(discoveredMap, null, 2));

    const outputPath = path.join(__dirname, '..', 'lib', 'printifyDiscovered.json');
    fs.writeFileSync(outputPath, JSON.stringify(discoveredMap, null, 2));
    console.log(`\n✅ Saved discovered map to: ${outputPath}`);

  } catch (err) {
    console.error('❌ Printify API Error:', err);
  }
}

main();
