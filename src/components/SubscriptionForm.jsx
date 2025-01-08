import { subscribeEmail } from '../utils/api';

// In your form submission handler:
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await subscribeEmail(email);
    // Handle success
    console.log('Subscription successful:', response);
  } catch (error) {
    // Handle error
    console.error('Subscription failed:', error);
  }
}; 