// src/lib/email-service.js
export async function sendWelcomeEmail(email, unsubscribeToken) {
  try {
    console.log('Starting email send to:', email);

    const response = await fetch('/api/send-welcome-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email,
        unsubscribeToken 
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Email API error:', errorData);
      return false;
    }

    const result = await response.json();
    console.log('Email send result:', result);
    return true;
  } catch (error) {
    console.error('Error in sendWelcomeEmail:', error);
    return false;
  }
}