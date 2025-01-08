const API_URL = import.meta.env.VITE_API_URL || 'https://api.elementalgames.gg';

export const checkSubscriptionStatus = async (email) => {
  try {
    const response = await fetch(`${API_URL}/check-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    const data = await response.json();
    return data.isSubscribed;
  } catch (error) {
    console.error('Error checking subscription:', error);
    return false;
  }
};

export const handleNewSignup = async (email) => {
  try {
    // First check if they're already subscribed
    const isSubscribed = await checkSubscriptionStatus(email);
    
    if (!isSubscribed) {
      // If not subscribed, handle new signup
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      return data.success;
    }
    
    return false; // Already subscribed
  } catch (error) {
    console.error('Error handling signup:', error);
    return false;
  }
};
