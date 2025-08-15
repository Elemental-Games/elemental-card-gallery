export default async function handler(req, res) {
  const domain = process.env.VITE_SHOPIFY_STORE_DOMAIN;
  const token = process.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  
  try {
    // Try to get products with a simpler query first
    const query = `
      query {
        products(first: 10) {
          edges {
            node {
              id
              title
              handle
              variants(first: 5) {
                edges {
                  node {
                    id
                    title
                    availableForSale
                    price {
                      amount
                    }
                  }
                }
              }
            }
          }
        }
      }`;
    
    const response = await fetch(`https://${domain}/api/2024-04/graphql.json`, {
      method: 'POST',
      headers: {
        'X-Shopify-Storefront-Access-Token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    
    const data = await response.json();
    
    return res.status(200).json({
      success: true,
      domain,
      response: data
    });
    
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      domain
    });
  }
} 