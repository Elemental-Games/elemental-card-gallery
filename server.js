import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const isProd = process.env.NODE_ENV === 'production';

// CORS configuration based on environment
const corsOptions = {
  origin: isProd 
    ? ['https://elementalgames.gg', 'https://www.elementalgames.gg']
    : ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Test endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/subscribe', async (req, res) => {
  console.log('Subscribe endpoint hit with:', req.body);
  
  if (!req.body.email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const resend = new Resend(RESEND_API_KEY);
    const { email } = req.body;

    const data = await resend.emails.send({
      from: 'Elemental Masters <contact@elementalgames.gg>',
      to: email,
      subject: 'Welcome to Elemental Masters!',
      html: `<p>Welcome to Elemental Masters!</p>`
    });

    console.log('Email sent:', data);
    res.json({ message: 'Successfully subscribed!' });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ message: 'Error subscribing', error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`CORS enabled for: ${corsOptions.origin.join(', ')}`);
});