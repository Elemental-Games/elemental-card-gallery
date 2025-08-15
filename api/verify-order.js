import { verifyOrder } from '../src/lib/shopify-server.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { order_id } = req.query;
    
    if (!order_id) {
      return res.status(400).json({ error: 'Order ID is required' });
    }

    const order = await verifyOrder(order_id);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const isEligible = order.fullyPaid && parseFloat(order.totalPrice.amount) >= 25;
    
    res.json({
      success: true,
      eligible: isEligible,
      order: {
        id: order.id,
        totalPrice: order.totalPrice,
        fullyPaid: order.fullyPaid
      }
    });
  } catch (error) {
    console.error('Error verifying order:', error);
    res.status(500).json({ error: 'Failed to verify order' });
  }
} 