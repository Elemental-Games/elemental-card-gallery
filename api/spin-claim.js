import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();

const storefrontDomain = process.env.VITE_SHOPIFY_STORE_DOMAIN;
const adminDomain = process.env.SHOPIFY_ADMIN_DOMAIN || storefrontDomain;
const adminAccessToken = process.env.VITE_SHOPIFY_ADMIN_ACCESS_TOKEN;
const apiVersion = '2024-04';

const resend = new Resend(process.env.VITE_RESEND_API_KEY);

async function shopifyAdminRequest(query) {
  const URL = `https://${adminDomain}/admin/api/${apiVersion}/graphql.json`;
  const res = await fetch(URL, {
    method: 'POST',
    headers: {
      'X-Shopify-Access-Token': adminAccessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });
  return res.json();
}

function generateCode(prefix = 'ELEKIN') {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `${prefix}-${rand}`;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = req.body || (await (async () => {
      const chunks = [];
      for await (const c of req) chunks.push(c);
      try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { return {}; }
    })());

    const { email, percent } = body || {};
    if (!email || !percent) return res.status(400).json({ error: 'email and percent are required' });

    const code = generateCode(`SPIN${Math.round(percent * 100)}`);

    const mutation = `
      mutation {
        discountCodeBasicCreate(basicCodeDiscount: {
          title: "${code}",
          code: "${code}",
          startsAt: "${new Date().toISOString()}",
          customerSelection: { all: true },
          usageLimit: 1,
          appliesOncePerCustomer: true,
          customerGets: { items: { all: true }, value: { percentage: ${percent} } },
          combinesWith: { orderDiscounts: true, productDiscounts: true, shippingDiscounts: true }
        }) {
          codeDiscountNode { id }
          userErrors { field message }
        }
      }
    `;

    const adminResp = await shopifyAdminRequest(mutation);
    const errors = adminResp?.data?.discountCodeBasicCreate?.userErrors || [];
    if (adminResp?.errors) return res.status(500).json({ error: JSON.stringify(adminResp.errors) });
    if (errors.length) return res.status(500).json({ error: errors.map(e => e.message).join(', ') });

    // Send via Resend
    await resend.emails.send({
      from: 'Elemental Games <mark@elementalgames.gg>',
      to: email,
      subject: `🎁 Your Elekin TCG Prize Wheel Code!`,
      html: `
        <div style="font-family: sans-serif; text-align: center; padding: 20px; color: #333;">
          <h1 style="color: #8A2BE2;">You Won a Discount!</h1>
          <p>Congratulations! Here is your unique, one-time-use promo code:</p>
          <p style="font-size: 24px; font-weight: bold; color: #8A2BE2; margin: 20px 0;">${code}</p>
          <p>This code is good for <strong>${Math.round(percent * 100)}% off</strong> your next purchase (up to $25 off).</p>
          <a href="https://www.elementalgames.gg/shop" style="display: inline-block; margin-top: 20px; padding: 12px 24px; background-color: #f59e0b; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">Visit the Shop</a>
          <p>Thank you for your support!</p>
          <br>
          <p><em>- The Elekin Team</em></p>
          <img src="https://elementalgames.gg/Games_Logo.png" alt="Elekin Logo" style="width: 150px; margin-top: 20px;">
        </div>
      `
    });

    return res.status(200).json({ code });
  } catch (err) {
    console.error('spin-claim error:', err);
    return res.status(500).json({ error: String(err?.message || err) });
  }
} 