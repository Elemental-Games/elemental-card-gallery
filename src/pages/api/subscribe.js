import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    // Send welcome email
    await resend.emails.send({
      from: 'Elemental Games <contact@elementalgames.gg>',
      to: email,
      subject: 'Welcome to Elemental Masters',
      html: `
        <h1>Welcome to Elemental Masters!</h1>
        <p>Thank you for subscribing to our newsletter. We'll keep you updated with the latest news and announcements.</p>
      `,
    });

    // Here you would typically also save the email to your database
    
    return res.status(200).json({ message: 'Successfully subscribed' });
  } catch (error) {
    return res.status(500).json({ message: 'Error subscribing', error: error.message });
  }
}