import { NextResponse } from 'next/server';
import { Client, resources } from 'coinbase-commerce-node';

const { Charge } = resources;

if (!process.env.COINBASE_COMMERCE_API_KEY) {
  console.error('Missing COINBASE_COMMERCE_API_KEY');
}

Client.init(process.env.COINBASE_COMMERCE_API_KEY);

// Helper to get the base URL
const getBaseUrl = () => {
  if (process.env.VITE_SITE_URL) {
    return process.env.VITE_SITE_URL;
  }
  // Fallback for production
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'http://localhost:3000';
};

export async function POST(request) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const { metadata } = await request.json();
    const baseUrl = getBaseUrl();

    const chargeData = {
      name: 'Donation to Elemental Masters',
      description: 'Support the development of Elemental Masters',
      pricing_type: 'no_price',
      redirect_url: `${baseUrl}/donation-success`,
      cancel_url: `${baseUrl}/donate`,
      metadata: {
        ...metadata,
        environment: process.env.NODE_ENV
      }
    };

    console.log('Creating charge with data:', {
      ...chargeData,
      apiKeyExists: !!process.env.COINBASE_COMMERCE_API_KEY
    });

    const charge = await Charge.create(chargeData);
    
    return NextResponse.json(charge, { headers });
  } catch (error) {
    console.error('Coinbase charge error:', {
      message: error.message,
      stack: error.stack,
      apiKeyExists: !!process.env.COINBASE_COMMERCE_API_KEY
    });

    return NextResponse.json(
      { 
        error: 'Failed to create charge', 
        details: error.message,
        env: process.env.NODE_ENV
      },
      { status: 500, headers }
    );
  }
}

export async function OPTIONS(request) {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}