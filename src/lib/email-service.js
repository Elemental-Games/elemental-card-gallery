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

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Email API error:', errorData);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in sendWelcomeEmail:', error);
    return false;
  }
}