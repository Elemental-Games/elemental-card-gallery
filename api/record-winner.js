import dotenv from 'dotenv';
import { supabase } from '../server-supabase.js';

dotenv.config();

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

    const { email, prize, notes } = body || {};
    if (!email || !prize) return res.status(400).json({ error: 'email and prize are required' });

    const { data, error } = await supabase
      .from('Winners')
      .insert({ email, prize, source: 'wheel', notes: notes || null })
      .select('*')
      .single();

    if (error) return res.status(500).json({ error: error.message });

    return res.status(200).json({ success: true, winner: data });
  } catch (err) {
    console.error('record-winner error:', err);
    return res.status(500).json({ error: String(err?.message || err) });
  }
} 