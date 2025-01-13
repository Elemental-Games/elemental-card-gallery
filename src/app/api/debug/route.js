import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function GET() {
  try {
    const headersList = headers();
    const host = headersList.get('host') || 'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';
    const url = headersList.get('x-url') || 'unknown';
    
    // Force an immediate response to check if we reach this point
    console.log('Debug endpoint hit:', { host, userAgent });
    
    return new NextResponse(JSON.stringify({
      status: 'online',
      server: {
        host,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        userAgent,
        url
      },
      routes: {
        webhook: '/api/webhook',
        checkout: '/api/create-checkout-session'
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    });
  } catch (error) {
    console.error('Debug endpoint error:', error);
    return new NextResponse(JSON.stringify({
      error: 'Server diagnostic failed',
      details: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    });
  }
}

export async function POST(req) {
  const body = await req.json();
  const headersList = headers();
  
  return NextResponse.json({
    message: 'Debug POST endpoint',
    receivedData: body,
    time: new Date().toISOString(),
    headers: Object.fromEntries(headersList.entries())
  });
} 