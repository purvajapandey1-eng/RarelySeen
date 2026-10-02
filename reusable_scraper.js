// reusable_scraper.js
// A simple script to scrape products from Shopify-based brands (very common for homegrown brands)
// Run with: node reusable_scraper.js <brand-shopify-url>

async function scrapeShopifyStore(baseUrl) {
  try {
    // Most Shopify stores expose their products list at /products.json
    const response = await fetch(`${baseUrl}/products.json?limit=250`);
    if (!response.ok) {
      throw new Error(`Failed to fetch from ${baseUrl}: ${response.statusText}`);
    }
    
    const data = await response.json();
    const products = data.products.map(product => {
      // Find the first available price
      const price = product.variants?.[0]?.price || "0.00";
      
      // Get the primary image
      const image = product.images?.[0]?.src || null;
      
      return {
        title: product.title,
        price,
        image
      };
    });

    console.log(`Scraped ${products.length} products!`);
    
    // In a real scenario, we would write this to a file like sunday_loveshop_products.json
    console.log(JSON.stringify(products, null, 4));
    
  } catch (error) {
    console.error("Scraping error:", error.message);
  }
}

// Check for URL argument
const url = process.argv[2];
if (!url) {
  console.log("Usage: node reusable_scraper.js <https://example.com>");
} else {
  scrapeShopifyStore(url);
}
