export async function sendWelcomeEmail(email) {
  try {
    console.log('Starting email send to:', email);
    
    // Default to production URL if VITE_API_URL is not set
    const apiUrl = import.meta.env.VITE_API_URL || 'https://www.elementalgames.gg';
    console.log('Using API URL:', apiUrl);

    const response = await fetch(`${apiUrl}/api/subscribe`, {
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