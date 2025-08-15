import dotenv from 'dotenv';

dotenv.config();

const domain = process.env.VITE_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = '2024-04';

async function shopifyRequest(payload) {
  const URL = `https://${domain}/api/${apiVersion}/graphql.json`;
  const options = {
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };
  const res = await fetch(URL, options);
  return res.json();
}

async function getVariantAndSellingPlanByHandle(handle) {
  const query = `
    query productWithPlans($handle: String!) {
      product(handle: $handle) {
        id
        variants(first: 1) { nodes { id availableForSale } }
        sellingPlanGroups(first: 10) {
          nodes { sellingPlans(first: 10) { nodes { id name } } }
        }
      }
    }
  `;
  const variables = { handle };
  const response = await shopifyRequest({ query, variables });
  if (response.errors) throw new Error(JSON.stringify(response.errors));
  const product = response?.data?.product;
  if (!product || !product.variants?.nodes?.length) {
    throw new Error(`Product '${handle}' not found or has no variants`);
  }
  const variantId = product.variants.nodes[0].id;
  const sellingPlanId = product.sellingPlanGroups?.nodes?.[0]?.sellingPlans?.nodes?.[0]?.id || null;
  return { variantId, sellingPlanId };
}

async function createCheckoutWithItems(items) {
  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart { id checkoutUrl }
        userErrors { field message }
      }
    }
  `;
  const variables = {
    input: {
      lines: items.map((item) => ({
        merchandiseId: item.variantId,
        quantity: item.quantity || 1,
        ...(item.sellingPlanId ? { sellingPlanId: item.sellingPlanId } : {}),
      })),
    },
  };
  const response = await shopifyRequest({ query, variables });
  console.log('Shopify cartCreate response:', JSON.stringify(response));
  if (response.errors) throw new Error(JSON.stringify(response.errors));
  const errors = response.data?.cartCreate?.userErrors || [];
  if (errors.length) throw new Error(errors.map((e) => e.message).join(', '));
  const cart = response.data?.cartCreate?.cart;
  if (!cart?.checkoutUrl) throw new Error('No checkoutUrl in response');
  return cart;
}

async function getBody(req) {
  if (req.body) return req.body;
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    return {};
  }
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = await getBody(req);
    const { items } = body || {};
    console.log('Incoming checkout items:', JSON.stringify(items));

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'No items provided' });
    }

    // Resolve from handle when present (ensures correct variant and selling plan)
    const resolved = [];
    for (const item of items) {
      if (item.variantId) {
        resolved.push({ variantId: item.variantId, sellingPlanId: item.sellingPlanId, quantity: item.quantity || 1 });
      } else if (item.handle) {
        const { variantId, sellingPlanId } = await getVariantAndSellingPlanByHandle(item.handle);
        resolved.push({ variantId, sellingPlanId, quantity: item.quantity || 1 });
      } else {
        return res.status(400).json({ error: 'Each item must include either handle or variantId' });
      }
    }

    console.log('Resolved checkout items:', JSON.stringify(resolved));

    const cart = await createCheckoutWithItems(resolved);
    return res.status(200).json({ checkoutUrl: cart.checkoutUrl, checkoutId: cart.id });
  } catch (err) {
    console.error('Checkout session error:', err);
    return res.status(500).json({ error: 'Failed to create checkout session', details: String(err?.message || err) });
  }
} 