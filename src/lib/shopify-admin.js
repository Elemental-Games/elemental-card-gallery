const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const adminAccessToken = import.meta.env.VITE_SHOPIFY_ADMIN_ACCESS_TOKEN;

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
          value: {
            percentage: ${value}
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