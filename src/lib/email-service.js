import { Resend } from 'resend';

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

export const sendWelcomeEmail = async (email) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Elemental Masters <noreply@elementalgames.gg>',
      to: email,
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

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
};