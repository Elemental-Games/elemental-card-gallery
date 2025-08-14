import { NextResponse } from 'next/server';
import { createCheckoutWithItems } from '@/lib/shopify';

export async function POST(request) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const { items } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items provided' },
        { status: 400, headers }
      );
    }

    // Validate that all items have variantId
    for (const item of items) {
      if (!item.variantId) {
        return NextResponse.json(
          { error: 'All items must have a variantId' },
          { status: 400, headers }
        );
      }
    }

    const checkout = await createCheckoutWithItems(items);

    if (!checkout || !checkout.webUrl) {
      return NextResponse.json(
        { error: 'Failed to create checkout session' },
        { status: 500, headers }
      );
    }

    return NextResponse.json({
      checkoutUrl: checkout.webUrl,
      checkoutId: checkout.id
    }, { headers });

  } catch (error) {
    console.error('Checkout session error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create checkout session', 
        details: error.message 
      },
      { status: 500, headers }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 