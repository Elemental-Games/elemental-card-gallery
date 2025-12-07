/**
 * Helper script to get variant ID from Shopify product ID
 * 
 * Usage: node scripts/get-shopify-variant.js <productId>
 * Example: node scripts/get-shopify-variant.js 9762919121136
 */

import dotenv from 'dotenv';
dotenv.config();

const domain = process.env.VITE_SHOPIFY_STORE_DOMAIN;
const token = process.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function getProductVariant(productId) {
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
    console.error('Shopify API errors:', data.errors);
    return null;
  }

  const product = data.data.product;
  
  if (!product) {
    console.error('Product not found');
    return null;
  }

  console.log('\n✅ Product Found:');
  console.log(`Title: ${product.title}`);
  console.log(`Handle: ${product.handle}`);
  console.log(`Product ID: ${product.id}`);
  console.log('\n📦 Variants:');
  
  product.variants.edges.forEach((edge, index) => {
    console.log(`\nVariant ${index + 1}:`);
    console.log(`  Variant ID: ${edge.node.id}`);
    console.log(`  Title: ${edge.node.title}`);
    console.log(`  Price: $${edge.node.price.amount}`);
    console.log(`  Available: ${edge.node.availableForSale ? 'Yes' : 'No'}`);
  });

  return {
    productId: product.id,
    handle: product.handle,
    variants: product.variants.edges.map(edge => ({
      variantId: edge.node.id,
      title: edge.node.title,
      price: edge.node.price.amount,
      availableForSale: edge.node.availableForSale
    }))
  };
}

const productId = process.argv[2];

if (!productId) {
  console.error('Usage: node scripts/get-shopify-variant.js <productId>');
  console.error('Example: node scripts/get-shopify-variant.js 9762919121136');
  process.exit(1);
}

getProductVariant(productId)
  .then(result => {
    if (result) {
      console.log('\n✨ Copy this variant ID to your bundle definition:');
      console.log(result.variants[0].variantId);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    process.exit(1);
  });

