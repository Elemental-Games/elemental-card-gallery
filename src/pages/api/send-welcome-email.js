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

    const { data, error } = await resend.emails.send({
      from: 'Elemental Games <noreply@elementalgames.gg>',
      to: email,
      subject: 'Welcome to Elemental Masters!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1>Welcome to Elemental Masters!</h1>
          <p>Thank you for joining our community!</p>
          <p>You can unsubscribe at any time by clicking <a href="https://elementalgames.gg/unsubscribe?email=${email}">here</a></p>
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