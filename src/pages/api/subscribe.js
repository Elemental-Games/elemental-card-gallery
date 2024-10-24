import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email } = req.body;
    
    // Generate a unique unsubscribe token (you'd typically store this in a database)
    const unsubscribeToken = Buffer.from(email).toString('base64');
    const unsubscribeUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe?token=${unsubscribeToken}`;

    // Send welcome email
    await resend.emails.send({
      from: 'Elemental Games <contact@elementalgames.gg>',
      to: email,
      subject: 'Welcome to Elemental Masters',
      html: `
        <h1>Welcome to Elemental Masters!</h1>
        <p>Thank you for subscribing to our newsletter. We're excited to have you join our community!</p>
        
        <h2>Key Features of Elemental Masters:</h2>
        <ul>
          <li>Interactive card technology with QR codes</li>
          <li>Rich world and lore across four main elements</li>
          <li>Unique battle mechanics with strength and agility stats</li>
          <li>Quick 20-minute games, easy to learn, challenging to master</li>
        </ul>

        <h2>Coming Soon:</h2>
        <ul>
          <li>Kickstarter launch on November 1st, 2024</li>
          <li>Early Bird Special - Autographed cards for first 169 backers</li>
          <li>Official Marketplace</li>
          <li>Weekly X spaces for live events and Q&A sessions</li>
        </ul>

        <p>Stay tuned for more updates and exclusive content!</p>
        
        <hr>
        <p style="font-size: 12px; color: #666;">
          You received this email because you subscribed to Elemental Masters updates. 
          <br>
          To unsubscribe from these emails, <a href="${unsubscribeUrl}">click here</a>
        </p>
      `,
    });

    return res.status(200).json({ message: 'Successfully subscribed' });
  } catch (error) {
    return res.status(500).json({ message: 'Error subscribing', error: error.message });
  }
}