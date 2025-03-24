// Moving from /api/send-welcome-email.js to /pages/api/send-welcome-email.js
import { Resend } from 'resend';

export default async function handler(req, res) {
  console.log('API endpoint called with:', req.body);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    console.log('Resend initialized with API key present:', !!process.env.RESEND_API_KEY);

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Calculate days until June 1, 2025
    const today = new Date();
    const launchDate = new Date('2025-06-01');
    const timeDiff = launchDate.getTime() - today.getTime();
    const daysUntilLaunch = Math.ceil(timeDiff / (1000 * 3600 * 24));

    const { data, error } = await resend.emails.send({
      from: 'Elemental Games <noreply@elementalgames.gg>',
      to: email,
      subject: 'Elemental Games',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1A103C; color: #fff; padding: 30px; border-radius: 15px; border: 2px solid #fcd34d;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="margin: 0; color: #fcd34d; font-size: 32px; text-transform: uppercase; letter-spacing: 2px; text-shadow: 0px 2px 4px rgba(0,0,0,0.5);">Welcome to Elekin TCG</h1>
          </div>

          <div style="font-size: 18px; line-height: 1.6; margin-bottom: 30px; text-align: center;">
            <p>Thank you for signing up!</p>
            <p>We're excited to have you join our community of card game enthusiasts.</p>
          </div>

          <div style="background-color: rgba(252, 211, 77, 0.1); border-left: 4px solid #fcd34d; padding: 20px; margin-bottom: 30px; border-radius: 4px;">
            <h3 style="color: #fcd34d; margin-top: 0;">As a subscriber, you'll enjoy:</h3>
            <ul style="padding-left: 20px; color: #e2e8f0;">
              <li style="margin-bottom: 10px;">Exclusive card reveals before anyone else</li>
              <li style="margin-bottom: 10px;">Early access to pre-order opportunities</li>
              <li style="margin-bottom: 10px;">Special promotions only for our subscribers</li>
              <li style="margin-bottom: 10px;">Early access to new game features and updates</li>
              <li style="margin-bottom: 10px;">Very Super Early access to new game features and updates</li>
            </ul>
          </div>

          <div style="margin-bottom: 30px;">
            <a href="https://elementalgames.gg/login?mode=signup" style="display: block; background-color: #fcd34d; color: #1A103C; text-align: center; padding: 16px 24px; text-decoration: none; font-weight: bold; border-radius: 8px; font-size: 18px; letter-spacing: 1px;">
              CREATE YOUR ACCOUNT
            </a>
          </div>

          <div style="margin-bottom: 30px; text-align: center;">
            <p style="margin-bottom: 15px; color: #e2e8f0;">Connect with us:</p>
            <div style="text-align: center;">
              <a href="https://discord.gg/elemental-games" style="text-decoration: none; display: inline-block; margin: 0 10px;">
                <img src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/91_Discord_logo_logos-512.png" alt="Discord" width="32" height="32" style="max-width: 32px; height: auto;" />
              </a>
              <a href="https://twitter.com/elementalgames" style="text-decoration: none; display: inline-block; margin: 0 10px;">
                <img src="https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/twitter_circle-512.png" alt="Twitter" width="32" height="32" style="max-width: 32px; height: auto;" />
              </a>
              <a href="https://instagram.com/elementalgames" style="text-decoration: none; display: inline-block; margin: 0 10px;">
                <img src="https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/instagram_circle-512.png" alt="Instagram" width="32" height="32" style="max-width: 32px; height: auto;" />
              </a>
            </div>
          </div>

          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center; color: #9ca3af; font-size: 12px;">
            <p>⚡ Launching in <strong>June 2025</strong>! ⚡</p>
            <p style="color: #9ca3af; font-size: 11px;">${daysUntilLaunch} days until launch - June 2025</p>
            <p>Elemental Games LLC © 2025. All rights reserved.</p>
            <p>You're receiving this email because you signed up for updates about Elekin: Masters of Kinbrold.</p>
            <p><a href="https://elementalgames.gg/unsubscribe?email=${email}" style="color: #9ca3af; text-decoration: underline;">Unsubscribe</a></p>
          </div>
        </div>
      `
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(400).json({ error: error.message });
    }

    console.log('Email sent successfully:', data);
    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message
    });
  }
}