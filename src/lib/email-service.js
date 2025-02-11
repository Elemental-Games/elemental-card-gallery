import { Resend } from 'resend';

const isDev = import.meta.env.DEV;

const mockEmailService = {
  emails: {
    send: async (options) => {
      console.log('Mock email sent:', options);
      return { data: {}, error: null };
    }
  }
};

const emailClient = isDev ? mockEmailService : new Resend(import.meta.env.VITE_RESEND_API_KEY);

export const sendWelcomeEmail = async (email) => {
  // Skip sending emails in development
  if (import.meta.env.DEV) {
    console.log('Development mode: Skipping welcome email to', email);
    return {
      success: true,
      message: 'Email skipped in development'
    };
  }

  try {
    const { data, error } = await emailClient.emails.send({
      from: 'Elemental Games <noreply@elementalgames.gg>',
      to: email,
      subject: 'Welcome to Elemental Games!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #6d28d9;">Welcome to Elemental Games!</h1>
          <p>Thank you for creating an account!</p>
          <p>You can now:</p>
          <ul>
            <li>Build and save your decks</li>
            <li>Share decks with the community</li>
            <li>Participate in discussions</li>
          </ul>
          <div style="margin: 20px 0;">
            <p>Connect with us:</p>
            <a href="https://x.com/elemental_tcg" style="color: #6d28d9;">Twitter</a> | 
            <a href="https://discord.gg/qXNWh4dMve" style="color: #6d28d9;">Discord</a>
          </div>
          <p style="font-size: 12px; color: #666; margin-top: 30px;">
            You received this email because you created an account at Elemental Games.
          </p>
        </div>
      `
    });

    if (error) {
      console.error('Failed to send welcome email:', error);
      if (error.message?.includes('rate') || error.statusCode === 429) {
        return {
          success: false,
          message: 'Too many emails sent. Please try again later.'
        };
      }
      return {
        success: false,
        message: error.message
      };
    }

    return {
      success: true,
      message: 'Welcome email sent successfully'
    };
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    if (error.message?.includes('rate') || error.statusCode === 429) {
      return {
        success: false,
        message: 'Too many emails sent. Please try again later.'
      };
    }
    return {
      success: false,
      message: error.message
    };
  }
};