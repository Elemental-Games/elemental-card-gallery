import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const checkSubscriptionStatus = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/check-subscription`, { email });
    return response.data.isSubscribed;
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
      const response = await axios.post(`${API_URL}/signup`, { email });
      return response.data.success;
    }
    
    return false; // Already subscribed
  } catch (error) {
    console.error('Error handling signup:', error);
    return false;
  }
};
