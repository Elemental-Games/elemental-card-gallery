// api/send-welcome-email.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const { data, error } = await resend.emails.send({
      from: 'Elemental Games <noreply@elementalgames.gg>',
      to: email,
      subject: 'Welcome to Elemental Masters!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <img src="https://elementalgames.gg/Games_Logo.png" alt="Elemental Games Logo" style="width: 200px; margin: 20px auto; display: block;">
          
          <h1 style="color: #6B46C1; text-align: center;">Welcome to Elemental Masters!</h1>
          
          <p>Thank you for subscribing to our newsletter! We're excited to have you join our growing community of Elemental Masters players.</p>
          
          <p>You'll be the first to know about:</p>
          <ul>
            <li>Our upcoming Kickstarter launch</li>
            <li>Exclusive card previews</li>
            <li>Tournament announcements</li>
            <li>Community events and news</li>
          </ul>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://elementalgames.gg/gameplay" 
               style="background-color: #6B46C1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
              Learn How to Play
            </a>
          </div>
          
          <p>Connect with us:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="https://discord.gg/qXNWh4dMve" style="margin: 0 10px;">Discord</a>
            <a href="https://x.com/elemental_tcg" style="margin: 0 10px;">X (Twitter)</a>
          </div>
          
          <p style="font-size: 12px; color: #666; text-align: center; margin-top: 40px;">
            You received this email because you subscribed to Elemental Masters updates.
            <br>
            To unsubscribe, click <a href="https://elementalgames.gg/unsubscribe?email=${email}">here</a>.
          </p>
        </div>
      `
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}