import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';

console.log('Server starting...');
console.log('RESEND_API_KEY exists:', !!RESEND_API_KEY);
console.log('SITE_URL:', SITE_URL);

if (!RESEND_API_KEY) {
  console.error('ERROR: RESEND_API_KEY is not set in environment variables');
  process.exit(1);
}

const resend = new Resend(RESEND_API_KEY);

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  console.log('Health check endpoint hit');
  res.status(200).json({ status: 'ok' });
});

app.post('/api/subscribe', async (req, res) => {
  console.log('Subscribe endpoint hit');
  console.log('Request body:', req.body);

  if (!req.body.email) {
    console.log('No email provided');
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const { email } = req.body;
    const unsubscribeToken = Buffer.from(email).toString('base64');
    const unsubscribeUrl = `${SITE_URL}/unsubscribe?token=${unsubscribeToken}`;

    console.log('Attempting to send email to:', email);
    
    const emailResponse = await resend.emails.send({
      from: 'Elemental Masters <contact@elementalgames.gg>',
      to: email,
      subject: 'Welcome to the World of Elemental Masters!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1>Welcome to Elemental Masters!</h1>
          <p>Thank you for joining our community!</p>
          <a href="${unsubscribeUrl}">Unsubscribe</a>
        </div>
      `,
    });

    console.log('Email sent successfully:', emailResponse);
    return res.status(200).json({ 
      message: 'Successfully subscribed', 
      emailResponse 
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ 
      message: 'Error subscribing', 
      error: error.message 
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});