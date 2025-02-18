import { Resend } from 'resend';

const emailClient = new Resend(import.meta.env.VITE_RESEND_API_KEY);

export const sendWelcomeEmail = async (email) => {
  try {
    const { data, error } = await emailClient.emails.send({
      from: 'Elemental Games <contact@elementalgames.gg>',
      to: email,
      subject: 'Welcome to Elemental Games!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #6d28d9;">Welcome to Elemental Games!</h1>
          <p>Thank you for creating an account! Please check your email for a verification link to complete your registration.</p>
          <p>Once verified, you can:</p>
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
      return {
        success: false,
        message: 'Failed to send welcome email'
      };
    }

    return {
      success: true,
      message: 'Welcome email sent successfully'
    };
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return {
      success: false,
      message: error.message
    };
  }
};