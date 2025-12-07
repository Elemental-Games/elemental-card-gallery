export default async function handler(req, res) {
  const domain = process.env.VITE_SHOPIFY_STORE_DOMAIN;
  const token = process.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  
  // Get product ID from query params
  const { productId } = req.query;
  
  if (!productId) {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  try {
    const query = `
      query getProduct($id: ID!) {
        product(id: $id) {
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
                availableForSale
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
      body: JSON.stringify({ 
        query,
        variables: { id: `gid://shopify/Product/${productId}` }
      }),
    });
    
    const data = await response.json();
    
    if (data.errors) {
      return res.status(500).json({ error: 'Shopify API errors', details: data.errors });
    }
    
    const product = data.data.product;
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    return res.status(200).json({
      success: true,
      product: {
        productId: product.id,
        title: product.title,
        handle: product.handle,
        variants: product.variants.edges.map(edge => ({
          variantId: edge.node.id,
          title: edge.node.title,
          price: edge.node.price.amount,
          availableForSale: edge.node.availableForSale
        }))
      }
    });
    
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}

