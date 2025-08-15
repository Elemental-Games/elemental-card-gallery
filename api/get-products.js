export default async function handler(req, res) {
  const domain = process.env.VITE_SHOPIFY_STORE_DOMAIN;
  const token = process.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  
  try {
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
    
    const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'X-Shopify-Storefront-Access-Token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    
    const data = await response.json();
    
    if (data.errors) {
      return res.status(500).json({ error: 'Shopify API errors', details: data.errors });
    }
    
    // Format the response to show products and their variant IDs
    const products = data.data.products.edges.map(edge => ({
      productId: edge.node.id,
      title: edge.node.title,
      handle: edge.node.handle,
      variants: edge.node.variants.edges.map(variantEdge => ({
        variantId: variantEdge.node.id,
        title: variantEdge.node.title,
        price: variantEdge.node.price.amount
      }))
    }));
    
    return res.status(200).json({
      success: true,
      products
    });
    
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
} 