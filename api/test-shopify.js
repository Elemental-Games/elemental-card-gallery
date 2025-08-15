export default async function handler(req, res) {
  // Test basic Shopify connection
  const domain = process.env.VITE_SHOPIFY_STORE_DOMAIN;
  const token = process.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  
  console.log('Domain:', domain);
  console.log('Token exists:', !!token);
  
  if (!domain || !token) {
    return res.status(500).json({ 
      error: 'Missing environment variables',
      domain: !!domain,
      token: !!token 
    });
  }
  
  try {
    const query = `{ shop { name } }`;
    
    const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
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
      shopName: data.data?.shop?.name || 'Unknown',
      response: data
    });
    
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      domain
    });
  }
} 