import supabase from '../server-supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { order_id } = req.query;
    
    if (!order_id) {
      return res.status(400).json({ error: 'Order ID is required' });
    }

    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(order_id);

    let query = supabase.from('wheel_spins').select('id').limit(1);
    if (isUuid) {
      query = query.eq('id', order_id);
    } else {
      query = query.eq('shopify_order_id', order_id);
    }
    const { data, error } = await query;

    if (error) {
      console.error('Supabase error verifying order:', error);
      return res.status(500).json({ error: 'Failed to verify order' });
    }

    const exists = Array.isArray(data) && data.length > 0;

    res.json({ success: true, eligible: exists });
  } catch (error) {
    console.error('Error verifying order:', error);
    res.status(500).json({ error: 'Failed to verify order' });
  }
} 