import { Resend } from 'resend';

// Create a single instance of Resend
const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

export const sendWelcomeEmail = async (email) => {
  if (!import.meta.env.VITE_RESEND_API_KEY) {
    console.error('RESEND_API_KEY is missing from environment variables');
    return {
      success: false,
      message: 'Email service configuration error'
    };
  }

  try {
    console.log('Sending welcome email to:', email);
    
    const response = await resend.emails.send({
      from: 'Elemental Masters <noreply@elementalgames.gg>',
      to: email,
      subject: 'Welcome to Elemental Masters!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #6d28d9;">Welcome to Elemental Masters!</h1>
          <p>Thank you for joining our community!</p>
          <p>Stay tuned for updates about:</p>
          <ul>
            <li>Our upcoming Kickstarter launch</li>
            <li>Exclusive card previews</li>
            <li>Community events</li>
          </ul>
          <div style="margin: 20px 0;">
            <p>Connect with us:</p>
            <a href="https://x.com/elemental_tcg" style="color: #6d28d9;">Twitter</a> | 
            <a href="https://discord.gg/qXNWh4dMve" style="color: #6d28d9;">Discord</a>
          </div>
          <p style="font-size: 12px; color: #666; margin-top: 30px;">
            You received this email because you signed up for Elemental Masters updates.
            <br>
            <a href="https://elementalgames.gg/unsubscribe?email=${btoa(email)}" style="color: #6d28d9;">Unsubscribe</a>
          </p>
        </div>
      `
    });

    console.log('Email sent successfully:', response);
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