import dotenv from 'dotenv';

dotenv.config();

const domain = process.env.VITE_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = '2024-04'; // Use a recent, stable API version

async function ShopifyData(payload) {
  const URL = `https://${domain}/api/${apiVersion}/graphql.json`;

  const options = {
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
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

export async function createCheckoutWithItems(items) {
  const query = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
        }
        checkoutUserErrors {
          field
          message
        }
      }
    }`;
  
  const variables = {
    input: {
      lineItems: items.map(item => ({
        variantId: item.variantId,
        quantity: item.quantity
      }))
    }
  };

  const response = await ShopifyData({ query, variables });

  console.log('Full response from Shopify:', JSON.stringify(response, null, 2));

  if (response.errors) {
    console.error('Shopify API errors:', response.errors);
    throw new Error('Shopify API returned errors.');
  }

  if (!response.data) {
    console.error('No data in Shopify response:', response);
    throw new Error('Invalid response from Shopify API.');
  }

  if (response.data.checkoutCreate.checkoutUserErrors.length > 0) {
    console.error('Shopify checkout user errors:', response.data.checkoutCreate.checkoutUserErrors);
    const errorMessage = response.data.checkoutCreate.checkoutUserErrors.map(e => e.message).join(', ');
    throw new Error(`Failed to create checkout: ${errorMessage}`);
  }

  const checkout = response.data.checkoutCreate.checkout;

  return checkout;
} 