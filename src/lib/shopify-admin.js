const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const adminAccessToken = import.meta.env.VITE_SHOPIFY_ADMIN_ACCESS_TOKEN;

// Bundle product IDs to exclude from all discount codes
const BUNDLE_PRODUCT_IDS = [
  'gid://shopify/Product/9762924658928', // Dumoles Holiday Bundle
  'gid://shopify/Product/9762925576432', // Guardian Holiday Bundle
  'gid://shopify/Product/9762931081456', // Holiday Pack Bundle
  'gid://shopify/Product/9762933014768', // 2-Player Holiday Bundle
];

async function ShopifyAdminData(query) {
  const URL = `https://${domain}/admin/api/2023-01/graphql.json`;

  const options = {
    method: 'POST',
    headers: {
      'X-Shopify-Access-Token': adminAccessToken,
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
    throw new Error("Shopify Admin API request failed");
  }
}

export async function verifyOrder(orderId) {
  const query = `
    {
      order(id: "gid://shopify/Order/${orderId}") {
        id
        fullyPaid
        totalPrice {
          amount
          currencyCode
        }
      }
    }`;

  const response = await ShopifyAdminData(query);

  const order = response.data.order ? response.data.order : null;

  return order;
}

export async function createDiscountCode(title, value, usageLimit) {
    // Build excluded products array for GraphQL
    const excludedProducts = BUNDLE_PRODUCT_IDS.map(id => `"${id}"`).join(', ');
    
    const query = `
      mutation {
        discountCodeBasicCreate(basicCodeDiscount: {
          title: "${title}",
          code: "${title.toUpperCase()}",
          startsAt: "${new Date().toISOString()}",
          customerSelection: {
            allCustomers: true
          },
          usageLimit: ${usageLimit},
          appliesOncePerCustomer: true,
          customerGets: {
          value: {
            percentage: ${value}
            },
            items: {
              all: true,
              excludedProducts: {
                products: [${excludedProducts}]
              }
            }
          },
          combinesWith: {
            orderDiscounts: true,
            productDiscounts: true,
            shippingDiscounts: true
          }
        }) {
          codeDiscountNode {
            codeDiscount {
              ... on DiscountCodeBasic {
                codes(first: 1) {
                  edges {
                    node {
                      code
                    }
                  }
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }`;
  
    const response = await ShopifyAdminData(query);
  
    const discount = response.data.discountCodeBasicCreate.codeDiscountNode ? response.data.discountCodeBasicCreate.codeDiscountNode.codeDiscount.codes.edges[0].node.code : null;
  
    return discount;
  } 