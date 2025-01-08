export const sendWelcomeEmail = async (email) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('Failed to send welcome email');
    }

    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
};