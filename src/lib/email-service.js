// src/lib/email-service.js
export async function sendWelcomeEmail(email) {
  try {
    console.log('Starting email send to:', email);

    const response = await fetch('/api/send-welcome-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });

    console.log('Email API response status:', response.status);

    const data = await response.json();
    console.log('Email API response data:', data);

    if (!response.ok) {
      console.error('Email API error:', data);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in sendWelcomeEmail:', error);
    return false;
  }
}