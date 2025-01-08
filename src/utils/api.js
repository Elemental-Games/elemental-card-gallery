export const subscribeEmail = async (email) => {
  // Use relative URL in production, full URL in development
  const API_URL = import.meta.env.PROD 
    ? 'https://elementalgames.gg/api/subscribe'  // Production URL
    : 'http://localhost:3001/api/subscribe';     // Development URL
  
  try {
    console.log('Making API call to:', API_URL);
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to subscribe');
    }

    return await response.json();
  } catch (error) {
    console.error('Subscription error:', error);
    throw error;
  }
};
