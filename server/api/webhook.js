import Stripe from 'stripe';
import { supabase } from '../lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      endpointSecret
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful payments
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    
    // Update donation status in Supabase
    const { error } = await supabase
      .from('donations')
      .update({ payment_status: 'completed' })
      .eq('payment_intent', paymentIntent.id);

    if (error) {
      console.error('Error updating donation status:', error);
      return res.status(500).json({ error: 'Failed to update donation status' });
    }
  }

  res.json({ received: true });
} 