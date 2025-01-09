import { Resend } from 'resend';

// Initialize Resend with error handling
const initializeResend = () => {
  try {
    const apiKey = import.meta.env.VITE_RESEND_API_KEY;
    if (!apiKey) {
      console.warn('RESEND_API_KEY is not set in environment variables');
      return null;
    }
    return new Resend(apiKey);
  } catch (error) {
    console.error('Failed to initialize Resend:', error);
    return null;
  }
};

export const sendWelcomeEmail = async (email) => {
  const resend = initializeResend();
  
  if (!resend) {
    console.error('Cannot send email: Resend not properly initialized');
    return {
      success: false,
      message: 'Email service temporarily unavailable'
    };
  }

  try {
    console.log('Attempting to send welcome email to:', email);
    console.log('Using Resend API key:', import.meta.env.VITE_RESEND_API_KEY ? 'Present' : 'Missing');

    const response = await resend.emails.send({
      from: 'Elemental Masters <noreply@elementalgames.gg>',
      to: [email], // Make sure email is in an array
      subject: 'Welcome to Elemental Masters!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #6d28d9;">Welcome to Elemental Masters!</h1>
          
          <p>Thank you for joining our community! We're excited to have you on this journey with us.</p>
          
          <h2 style="color: #7c3aed;">What's Next:</h2>
          <ul>
            <li>Follow us on <a href="https://x.com/elemental_tcg">X (Twitter)</a></li>
            <li>Join our <a href="https://discord.gg/qXNWh4dMve">Discord community</a></li>
            <li>Stay tuned for our Kickstarter launch!</li>
          </ul>

          <p style="font-size: 12px; color: #666; margin-top: 30px;">
            You received this email because you signed up for updates about Elemental Masters.
            <br>
            <a href="https://elementalgames.gg/unsubscribe?email=${Buffer.from(email).toString('base64')}">Unsubscribe</a>
          </p>
        </div>
      `
    });

    console.log('Email send response:', response);

    return {
      success: true,
      message: 'Welcome email sent successfully'
    };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return {
      success: false,
      message: `Failed to send welcome email: ${error.message}`
    };
  }
};