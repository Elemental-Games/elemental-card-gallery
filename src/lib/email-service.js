// src/lib/email-service.js
export async function sendWelcomeEmail(email) {
  try {
    console.log('Starting email send to:', email);

    // Log the full request
    const requestBody = { email };
    console.log('Request body:', requestBody);

    const response = await fetch('/api/send-welcome-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    console.log('Response status:', response.status);

    const responseData = await response.json();
    console.log('Response data:', responseData);

    if (!response.ok) {
      console.error('Email API error:', responseData);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in sendWelcomeEmail:', error);
    return false;
  }
}