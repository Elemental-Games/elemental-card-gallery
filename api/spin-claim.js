import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();

const domain = process.env.VITE_SHOPIFY_STORE_DOMAIN;
const adminAccessToken = process.env.VITE_SHOPIFY_ADMIN_ACCESS_TOKEN;
const apiVersion = '2024-04';

const resend = new Resend(process.env.RESEND_API_KEY || process.env.VITE_RESEND_API_KEY);

async function shopifyAdminRequest(query) {
  const URL = `https://${domain}/admin/api/${apiVersion}/graphql.json`;
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
    const pct = Math.round(percent * 100); // integer percent 10,20,50

    const mutation = `
      mutation {
        discountCodeBasicCreate(basicCodeDiscount: {
          title: "${code}",
          code: "${code}",
          startsAt: "${new Date().toISOString()}",
          customerSelection: { allCustomers: true },
          usageLimit: 1,
          appliesOncePerCustomer: true,
          customerGets: { items: { all: true }, value: { percentage: ${pct} } },
          combinesWith: { orderDiscounts: true, productDiscounts: true, shippingDiscounts: true }
        }) {
          codeDiscountNode { id }
          userErrors { field message }
        }
      }
    `;

    const adminResp = await shopifyAdminRequest(mutation);
    const errors = adminResp?.data?.discountCodeBasicCreate?.userErrors || [];
    if (errors.length) return res.status(500).json({ error: errors.map(e => e.message).join(', ') });

    // Send via Resend
    await resend.emails.send({
      from: 'Elemental Games <mark@elementalgames.gg>',
      to: email,
      subject: `Your Elekin Spin Reward Code (${Math.round(percent*100)}% off)`,
      html: `<p>Congrats! Here is your unique promo code:</p><p style="font-size:24px;font-weight:bold;">${code}</p><p>Applies up to $25 off. One use per customer.</p>`
    });

    return res.status(200).json({ code });
  } catch (err) {
    console.error('spin-claim error:', err);
    return res.status(500).json({ error: String(err?.message || err) });
  }
} 