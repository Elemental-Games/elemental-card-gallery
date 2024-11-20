export async function sendWelcomeEmail(email) {
  try {
    console.log('Starting email send to:', email);

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });

    console.log('Email API response status:', response.status);

    if (!response.ok) {
      console.error('Email API error status:', response.status);
      return false;
    }

    const data = await response.json();
    console.log('Email API response data:', data);
    return true;

  } catch (error) {
    console.error('Error in sendWelcomeEmail:', error);
    return false;
  }
}