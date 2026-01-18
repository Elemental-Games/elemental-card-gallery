import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.VITE_RESEND_API_KEY || process.env.RESEND_API_KEY);

const PRIMARY_CTA =
  'https://www.elementalgames.gg/bundle/bundle_2player?utm_source=email&utm_medium=newsletter&utm_campaign=holiday_bundles_2025_12&utm_content=main_cta';

const RULEBOOK_PDF = 'https://www.elementalgames.gg/data/TCG%20Rulebook.pdf';
const RULEBOOK_PAGE = 'https://www.elementalgames.gg/elekin/rulebook';

const EMAILS = {
  offer_breakdown: {
    subject: '🎁 Holiday Bundles are live (save up to $30)',
    preheader: 'Free shipping $50+ • Bonus prize wheel spin $25+ • Limited supply',
    heroTitle: 'Holiday Bundles are live',
    heroSubtitle: 'Curated bundles for new players + collectors — at special pricing.',
    bullets: [
      'Tier 3 (Best value): 2‑Player Holiday Bundle — save $30',
      'Tier 1: Starter bundles — mat + deck + 3 packs (save $10)',
      'Tier 2: 12‑pack bundle — 12 packs for the price of 10 (save $10)',
    ],
    ctaLabel: 'Shop the 2‑Player Holiday Bundle →',
  },
  learn_fast: {
    subject: '📖 Want the Elekin rulebook + a 60‑second onramp?',
    preheader: 'Download the rulebook PDF + see the interactive rulebook',
    heroTitle: 'Learn Elekin fast',
    heroSubtitle: 'Here’s the rulebook + the easiest way to get playing this week.',
    bullets: [
      `Rulebook PDF: ${RULEBOOK_PDF}`,
      `Interactive rulebook: ${RULEBOOK_PAGE}`,
      'If you want the “everything for two players” setup, the 2‑Player bundle is the move.',
    ],
    ctaLabel: 'Shop the 2‑Player Holiday Bundle →',
  },
  social_proof: {
    subject: '🔥 3 new customers already grabbed Demo Day Edition',
    preheader: 'Thank you — and here’s how you can help us grow fast',
    heroTitle: 'Momentum is starting',
    heroSubtitle: 'We shipped 3 new‑customer preorders — now we’re pushing hard to grow the game.',
    bullets: [
      'If you buy, post a photo + tag us — we’ll feature you',
      'Join the Discord and tell us which deck you chose',
      'Holiday pricing is live for a limited time',
    ],
    ctaLabel: 'Shop Holiday Bundles →',
  },
  founder_push: {
    subject: '⚔️ Why buying now directly funds Elekin’s next step',
    preheader: 'Artwork + manufacturing + marketing — every order moves the needle',
    heroTitle: 'Buying now matters',
    heroSubtitle:
      'We’re launching Kickstarter in January — sales right now directly fund remaining artwork and the next print run.',
    bullets: [
      'Holiday Bundles: best way to start playing immediately',
      'Every $25+ order: bonus prize wheel spin',
      'Every $50+ order: free shipping',
    ],
    ctaLabel: 'Shop the 2‑Player Holiday Bundle →',
  },
  last_chance: {
    subject: '⏰ Last chance: Holiday pricing ends Jan 12',
    preheader: 'If you were on the fence — this is the moment',
    heroTitle: 'Last chance: Holiday pricing ends Jan 12',
    heroSubtitle:
      'Limited Demo Day Edition inventory. If you want to support Elekin before Kickstarter, this is the best time.',
    bullets: [
      'Best value: 2‑Player Holiday Bundle (save $30)',
      'Starter bundles for solo players (save $10)',
      'Rulebook included + bonus prize wheel spin',
    ],
    ctaLabel: 'Shop before the deadline →',
  },
};

function renderEmailHtml({ subject, preheader, heroTitle, heroSubtitle, bullets, ctaLabel, ctaUrl }) {
  const safeBullets = (bullets || [])
    .map((b) => `<li style="margin: 10px 0; color:#e0d4ff; font-size:16px; line-height:1.6;">${b}</li>`)
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin:0; padding:0; background-color:#1A103C; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">
  <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent;">
    ${preheader || ''}
  </div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center" style="padding: 22px 12px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px; width:100%; background:#1A103C; border-radius:14px; overflow:hidden; border:1px solid rgba(245,158,11,0.25);">
          <tr>
            <td style="background: linear-gradient(135deg, #8A2BE2 0%, #f59e0b 100%); padding: 26px 22px; text-align:center;">
              <img src="https://www.elementalgames.gg/Elekin_Icon.png" alt="Elekin TCG" style="max-width:160px; height:auto; margin: 0 auto 10px; display:block;" />
              <div style="font-size:12px; letter-spacing:2px; font-weight:800; color:rgba(255,255,255,0.95); text-transform:uppercase;">
                Elemental Games • Elekin TCG
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 34px 26px 10px; text-align:center;">
              <h1 style="margin:0 0 10px; color:#f59e0b; font-size:34px; line-height:1.15;">${heroTitle}</h1>
              <p style="margin:0; color:#e0d4ff; font-size:18px; line-height:1.6;">${heroSubtitle}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 18px 30px;">
              <div style="background: rgba(0,0,0,0.22); border: 1px solid rgba(245,158,11,0.25); border-radius: 12px; padding: 18px 18px;">
                <ul style="margin:0; padding-left: 18px;">
                  ${safeBullets}
                </ul>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 30px 28px; text-align:center;">
              <a href="${ctaUrl}" style="display:inline-block; background:#ffffff; color:#8A2BE2; text-decoration:none; font-weight:900; font-size:18px; padding: 14px 22px; border-radius:10px;">
                ${ctaLabel}
              </a>
              <div style="margin-top:16px; font-size:12px; color:#b9a6ff;">
                Free shipping $50+ • Bonus prize wheel spin $25+ • Ships in 3–5 business days
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 18px 22px; background:#0f071f; text-align:center; color:#9ca3af; font-size:12px;">
              <div style="margin-bottom:10px;">
                <a href="https://discord.gg/PVrgZBmcMq" style="color:#8A2BE2; text-decoration:none; margin:0 10px;">Discord</a>
                <a href="https://www.instagram.com/elekin_tcg/" style="color:#8A2BE2; text-decoration:none; margin:0 10px;">Instagram</a>
                <a href="https://www.tiktok.com/@elekin_tcg" style="color:#8A2BE2; text-decoration:none; margin:0 10px;">TikTok</a>
              </div>
              <div>You received this email because you subscribed to Elekin TCG updates.</div>
              <div style="margin-top:8px;">
                <a href="https://www.elementalgames.gg/unsubscribe" style="color:#8A2BE2; text-decoration:underline;">Unsubscribe</a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function renderEmailText({ subject, bullets, ctaUrl }) {
  return `${subject}

${(bullets || []).map((b) => `- ${b}`).join('\n')}

Shop: ${ctaUrl}
`;
}

async function getRecipients({ testEmail, email: testEmailAddress, sendToAll }) {
  if (testEmail) {
    return [testEmailAddress || 'mark@elementalgames.gg'];
  }
  if (!sendToAll) throw new Error('Either --test or --send-all is required');

  const { createClient } = await import('@supabase/supabase-js');
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) throw new Error('Supabase credentials not found');

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: subscribers, error } = await supabase
    .from('subscribers')
    .select('email')
    .eq('status', 'active');

  if (error) throw new Error(`Failed to fetch subscribers: ${error.message}`);
  if (!subscribers?.length) throw new Error('No active subscribers found');
  return subscribers.map((s) => s.email);
}

async function sendHolidaySprintEmail(options = {}) {
  const {
    variant = 'offer_breakdown',
    testEmail = false,
    email: testEmailAddress,
    sendToAll = false,
  } = options;

  const def = EMAILS[variant];
  if (!def) {
    throw new Error(
      `Unknown variant '${variant}'. Valid: ${Object.keys(EMAILS).join(', ')}`
    );
  }

  const recipients = await getRecipients({
    testEmail,
    email: testEmailAddress,
    sendToAll,
  });

  const ctaUrl =
    PRIMARY_CTA.replace('utm_content=main_cta', `utm_content=${encodeURIComponent(variant)}`);

  const html = renderEmailHtml({ ...def, ctaUrl });
  const text = renderEmailText({ subject: def.subject, bullets: def.bullets, ctaUrl });

  const result = await resend.emails.send({
    from: 'Elemental Games <mark@elementalgames.gg>',
    to: recipients,
    subject: testEmail ? `🧪 TEST: ${def.subject}` : def.subject,
    html,
    text,
  });

  if (result?.error) throw new Error(result.error.message || 'Failed to send email');

  return {
    success: true,
    messageId: result.data?.id,
    recipients: recipients.length,
    variant,
  };
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const variant = args.find((a) => a.startsWith('--variant='))?.split('=')[1] || 'offer_breakdown';
  const testEmail = args.includes('--test');
  const sendToAll = args.includes('--send-all');
  const email = args.find((a) => a.startsWith('--email='))?.split('=')[1];

  sendHolidaySprintEmail({
    variant,
    testEmail: testEmail || !sendToAll,
    email: email || 'mark@elementalgames.gg',
    sendToAll,
  })
    .then((r) => {
      console.log('✅ Sent:', r);
      process.exit(0);
    })
    .catch((e) => {
      console.error('❌ Failed:', e);
      process.exit(1);
    });
}

export { sendHolidaySprintEmail };


