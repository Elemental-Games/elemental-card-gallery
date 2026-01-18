import { sendHolidaySprintEmail } from '../../../send-holiday-sprint-email.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      variant = 'offer_breakdown',
      testEmail = false,
      email: testEmailAddress,
      sendToAll = false,
    } = req.body || {};

    const result = await sendHolidaySprintEmail({
      variant,
      testEmail: testEmail || !sendToAll,
      email: testEmailAddress || 'mark@elementalgames.gg',
      sendToAll,
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: 'Failed to send holiday sprint email',
    });
  }
}


