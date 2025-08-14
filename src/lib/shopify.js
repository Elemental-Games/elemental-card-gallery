// Check if we're in a browser environment (Vite) or Node.js environment
const domain = typeof window !== 'undefined' 
  ? import.meta.env.VITE_SHOPIFY_STORE_DOMAIN 
  : process.env.VITE_SHOPIFY_STORE_DOMAIN;

const storefrontAccessToken = typeof window !== 'undefined' 
  ? import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN 
  : process.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function ShopifyData(query) {
  const URL = `https://${domain}/api/2023-01/graphql.json`;

  const options = {
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  };

  try {
    const data = await fetch(URL, options).then(response => {
      return response.json()
    })

    return data
  } catch (error) {
    throw new Error("Products not fetched");
  }
}

export async function getProductsInCollection() {
  const query = `
    {
      collection(handle: "all") {
        id
        title
        products(first: 25) {
          edges {
            node {
              id
              title
              description
              handle
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                  }
                }
              }
            }
          }
        }
      }
    }`;

  const response = await ShopifyData(query);

  const allProducts = response.data.collection.products.edges ? response.data.collection.products.edges : [];

  return allProducts;
}

export async function createCheckout(id, quantity) {
  const query = `
    mutation {
      checkoutCreate(input: {
        lineItems: [{ variantId: "${id}", quantity: ${quantity} }]
      }) {
        checkout {
          id
          webUrl
        }
      }
    }`;

  const response = await ShopifyData(query);

  const checkout = response.data.checkoutCreate.checkout ? response.data.checkoutCreate.checkout : [];

  return checkout;
}

export async function createCheckoutWithItems(items) {
  const lineItems = items.map(item => `{ variantId: "${item.variantId}", quantity: ${item.quantity} }`).join(', ');
  
  const query = `
    mutation {
      checkoutCreate(input: {
        lineItems: [${lineItems}]
      }) {
        checkout {
          id
          webUrl
        }
      }
    }`;

  const response = await ShopifyData(query);

  const checkout = response.data.checkoutCreate.checkout ? response.data.checkoutCreate.checkout : [];

  return checkout;
} 