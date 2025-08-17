import dotenv from 'dotenv';
import { supabase } from '../server-supabase.js';
import { Resend } from 'resend';

dotenv.config();

const resend = new Resend(process.env.VITE_RESEND_API_KEY);

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body || {};
    const { email, prize, notes } = body;

    if (!email || !prize) {
      return res.status(400).json({ error: 'email and prize are required' });
    }

    const { data, error } = await supabase
      .from('Winners')
      .insert({ email, prize, source: 'wheel', notes: notes || null })
      .select('*')
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: error.message });
    }

    // Send confirmation email
    await resend.emails.send({
      from: 'Elemental Games <mark@elementalgames.gg>',
      to: email,
      subject: `🎁 Elekin TCG: Congratulations on winning a ${prize}!`,
      html: `
        <div style="font-family: sans-serif; text-align: center; padding: 20px; color: #333;">
          <h1 style="color: #8A2BE2;">Congratulations!</h1>
          <p>You won a <strong>${prize}</strong> from the Elekin prize wheel!</p>
          <p>We've recorded your prize, and it will be automatically added to your pre-order shipment in October 2025.</p>
          <p>Thank you again for your support. We can't wait for you to get your Elekin cards!</p>
          <a href="https://www.elementalgames.gg/shop" style="display: inline-block; margin-top: 20px; padding: 12px 24px; background-color: #f59e0b; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">Visit the Shop</a>
          <br>
          <p><em>- The Elekin Team</em></p>
          <img src="https://elementalgames.gg/Games_Logo.png" alt="Elekin Logo" style="width: 150px; margin-top: 20px;">
        </div>
      `
    });

    return res.status(200).json({ success: true, winner: data });

  } catch (err) {
    console.error('record-winner error:', err);
    return res.status(500).json({ error: String(err?.message || err) });
  }
} 