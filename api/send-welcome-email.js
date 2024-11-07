// api/send-welcome-email.js
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

    console.log('Attempting to send email to:', email);

    const { data, error } = await resend.emails.send({
      from: 'Elemental Games <noreply@elementalgames.gg>',
      to: email,
      subject: 'Welcome to Elemental Masters!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1a1a2e; color: #ffffff; padding: 32px; border-radius: 8px;">
  <img src="https://elementalgames.gg/Games_Logo.png" alt="Elemental Games Logo" style="width: 200px; margin: 20px auto; display: block;">
  
  <h1 style="color: #6B46C1; text-align: center; font-size: 28px; margin-bottom: 24px;">Welcome to Elemental Masters!</h1>
  
  <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
    Thank you for subscribing to our emails, and we're thrilled to have you join our community! You're arriving at the perfect time - we're preparing for our upcoming Kickstarter launch on December 1st, 2024. THREE LUCKY SUBSCRIBERS will receive exclusive game mats for subscribing before December 1st!!
  </p>

  <div style="background-color: #6B46C1; padding: 20px; border-radius: 8px; margin: 24px 0;">
    <h2 style="color: #ffffff; font-size: 22px; margin-bottom: 16px;">🎯 Mark Your Calendar</h2>
    <p style="color: #ffffff; margin-bottom: 10px;">
      <strong>Kickstarter Launch:</strong> December 1st, 2024
    </p>
    <p style="color: #ffffff; font-size: 14px;">
      Early bird special: First 169 backers of $50+ get an autographed card of their choice!
    </p>
  </div>

  <h2 style="color: #6B46C1; font-size: 22px; margin-bottom: 16px;">What's Next?</h2>
  <ul style="list-style: none; padding: 0; margin-bottom: 24px;">
    <li style="margin-bottom: 12px; padding-left: 24px; position: relative;">
      ✨ <span style="margin-left: 8px;">Exclusive card previews</span>
    </li>
    <li style="margin-bottom: 12px; padding-left: 24px; position: relative;">
      🎮 <span style="margin-left: 8px;">Playtest opportunities</span>
    </li>
    <li style="margin-bottom: 12px; padding-left: 24px; position: relative;">
      🎁 <span style="margin-left: 8px;">Early backer rewards announcements</span>
    </li>
    <li style="margin-bottom: 12px; padding-left: 24px; position: relative;">
      🌟 <span style="margin-left: 8px;">Weekly X Spaces for Q&A sessions</span>
    </li>
  </ul>

  <div style="text-align: center; margin: 32px 0;">
    <a href="https://elementalgames.gg/gameplay" 
       style="background-color: #6B46C1; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
      Learn How to Play
    </a>
  </div>

  <div style="border-top: 1px solid #6B46C1; margin-top: 32px; padding-top: 24px;">
    <h3 style="color: #6B46C1; font-size: 20px; margin-bottom: 16px; text-align: center;">Join Our Community</h3>
    <div style="text-align: center; margin-bottom: 24px;">
      <a href="https://discord.gg/qXNWh4dMve" 
         style="color: #6B46C1; text-decoration: none; margin: 0 16px; font-weight: bold;">Discord</a>
      <a href="https://x.com/elemental_tcg" 
         style="color: #6B46C1; text-decoration: none; margin: 0 16px; font-weight: bold;">X (Twitter)</a>
    </div>
  </div>

  <div style="text-align: center; margin-top: 32px; font-size: 12px; color: #888;">
    <p>You received this email because you subscribed to Elemental Masters updates.</p>
    <p style="margin-top: 8px;">
      <a href="https://elementalgames.gg/unsubscribe?email=${email}
         style="color: #6B46C1; text-decoration: underline;">Unsubscribe</a>
    </p>
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