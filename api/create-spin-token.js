import dotenv from 'dotenv';
import { Resend } from 'resend';
import { supabase } from '../server-supabase.js';

dotenv.config();

const domain = process.env.VITE_SHOPIFY_STORE_DOMAIN;
const adminAccessToken = process.env.VITE_SHOPIFY_ADMIN_ACCESS_TOKEN;
const apiVersion = '2023-01';

function gidFromNumeric(orderId) {
  if (String(orderId).startsWith('gid://')) return orderId;
  return `gid://shopify/Order/${orderId}`;
}

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

function randomToken() {
  return (Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)).slice(0, 24);
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

    const { orderId } = body || {};
    if (!orderId) return res.status(400).json({ error: 'orderId is required' });

    const gid = gidFromNumeric(orderId);
    const q = `{
      order(id: "${gid}") {
        id
        fullyPaid
        email
        totalPrice { amount currencyCode }
      }
    }`;
    const adminResp = await shopifyAdminRequest(q);
    const order = adminResp?.data?.order;
    if (!order) return res.status(404).json({ error: 'Order not found' });

    const amount = parseFloat(order.totalPrice?.amount || '0');
    if (!order.fullyPaid || isNaN(amount) || amount < 25) {
      return res.status(403).json({ error: 'Order not eligible' });
    }

    // Idempotent: one token per order
    const existing = await supabase
      .from('SpinTokens')
      .select('*')
      .eq('order_id', String(orderId))
      .maybeSingle();

    let tokenRow = existing.data;
    if (!tokenRow) {
      const token = randomToken();
      const { data, error } = await supabase
        .from('SpinTokens')
        .insert({ order_id: String(orderId), email: order.email, order_total: amount, token, used: false })
        .select('*')
        .single();
      if (error) return res.status(500).json({ error: error.message });
      tokenRow = data;
    }

    const url = `https://elementalgames.gg/order-success?token=${encodeURIComponent(tokenRow.token)}`;
    return res.status(200).json({ url });
  } catch (err) {
    console.error('create-spin-token error:', err);
    return res.status(500).json({ error: String(err?.message || err) });
  }
} 