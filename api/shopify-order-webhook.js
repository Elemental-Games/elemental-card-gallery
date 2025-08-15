import supabase from '../server-supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // In Vercel, body is usually parsed already. Fallback to raw if needed.
    let payload = req.body;
    if (!payload || typeof payload !== 'object') {
      let raw = '';
      for await (const chunk of req) raw += chunk;
      payload = JSON.parse(raw || '{}');
    }

    // Extract order id and totals from Shopify webhook
    const gid = payload?.admin_graphql_api_id;
    const idFromGid = gid && typeof gid === 'string' ? gid.split('/').pop() : null;
    const orderId = String(payload?.id || idFromGid || '');

    const totalPrice = Number(
      payload?.total_price ||
      payload?.current_total_price ||
      payload?.total_price_set?.shop_money?.amount ||
      0
    );
    const currency = payload?.currency || payload?.total_price_set?.shop_money?.currency_code || 'USD';

    if (!orderId) {
      return res.status(400).json({ error: 'Missing order id' });
    }

    const isEligible = totalPrice >= 25;
    if (!isEligible) {
      return res.status(200).json({ recorded: false, reason: 'below_threshold', shopify_order_id: orderId });
    }

    const { error } = await supabase
      .from('wheel_spins')
      .upsert(
        {
          shopify_order_id: orderId,
          order_total: totalPrice,
          order_currency: currency,
          source: 'shopify',
          is_eligible: true,
          claimed: false,
        },
        { onConflict: 'shopify_order_id' }
      );

    if (error) {
      console.error('Supabase insert error (wheel_spins):', error);
      return res.status(500).json({ error: 'Failed to record order' });
    }

    return res.status(200).json({ recorded: true, shopify_order_id: orderId, totalPrice, currency });
  } catch (e) {
    console.error('Webhook error:', e);
    return res.status(500).json({ error: 'Webhook error' });
  }
} 