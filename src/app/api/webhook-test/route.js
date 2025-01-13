import { NextResponse } from 'next/server';

export async function POST(req) {
  console.log('Webhook test received:', new Date().toISOString());
  
  const body = await req.text();
  const headers = Object.fromEntries(req.headers);
  
  console.log('Headers:', headers);
  console.log('Body:', body);
  
  return NextResponse.json({ received: true });
} 