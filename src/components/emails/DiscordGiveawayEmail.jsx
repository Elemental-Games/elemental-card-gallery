import { useState, useEffect } from 'react';

const DiscordGiveawayEmail = () => {
  const [countdown, setCountdown] = useState('Loading...');
  
  // Set countdown to start at exactly 3 hours from when component loads
  const [endTime] = useState(() => new Date(Date.now() + (3 * 60 * 60 * 1000)));

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const distance = endTime.getTime() - now.getTime();

      if (distance > 0) {
        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown(
          hours.toString().padStart(2, '0') + ':' + 
          minutes.toString().padStart(2, '0') + ':' + 
          seconds.toString().padStart(2, '0')
        );
      } else {
        setCountdown("🎁 GIVEAWAY HAS ENDED! 🎁");
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', background: 'linear-gradient(135deg, #2d1b69, #4c1d95)', color: '#fff', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', minHeight: '100vh' }}>
      {/* Header */}
      <table role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%">
        <tr>
          <td style={{ padding: '30px 20px', textAlign: 'center', background: 'linear-gradient(135deg, #1A103C, #2d1b69)' }}>
            <img src="/Elekin_Kinbrold_Icon.png" alt="Elekin Kinbrold" style={{ maxWidth: '300px', marginBottom: '30px', display: 'block', margin: '0 auto 30px auto' }} />
            <h1 style={{ margin: '0', color: '#fcd34d', fontSize: '36px', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: '900', textShadow: '2px 2px 4px rgba(0,0,0,0.5)', fontFamily: 'Impact, "Arial Black", "Helvetica Neue", Arial, sans-serif' }}>
              🎁 FIRST DISCORD GIVEAWAY! 🎁
            </h1>
            <p style={{ margin: '10px 0 0', color: '#e2e8f0', fontSize: '18px' }}>
              Join our Discord community for your chance to win!
            </p>
          </td>
        </tr>
      </table>

      {/* Countdown Timer */}
      <table role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%">
        <tr>
          <td style={{ padding: '20px', textAlign: 'center' }}>
            <table role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%">
              <tr>
                <td style={{ backgroundColor: '#7c3aed', borderRadius: '10px', padding: '25px', textAlign: 'center', margin: '10px' }}>
                  <h2 style={{ margin: '0 0 15px', color: 'white', fontSize: '24px' }}>⏰ Giveaway Countdown</h2>
                  <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#fcd34d', fontFamily: 'Courier New, monospace', margin: '10px 0', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                    {countdown}
                  </div>
                  <p style={{ margin: '15px 0 0', color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
                    Until Giveaway Ends (3:00 PM EST)
                  </p>
                  <p style={{ margin: '10px 0 0', color: '#fcd34d', fontSize: '16px' }}>
                    Join Discord and participate before time runs out!
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      {/* Main Discord CTA */}
      <table role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%">
        <tr>
          <td style={{ padding: '20px', textAlign: 'center' }}>
            <h2 style={{ color: '#fcd34d', fontSize: '28px', marginBottom: '20px' }}>🎮 Join Our Discord Community</h2>
            <p style={{ color: '#f1f5f9', fontSize: '18px', lineHeight: '1.6', marginBottom: '25px' }}>
              Our <strong>FIRST EVER</strong> Discord giveaway ends at <strong>3:00 PM EST TODAY</strong>! 
              Join our Discord and participate before time runs out to win exclusive Elekin TCG prizes!
            </p>
            
            <div style={{ background: 'linear-gradient(135deg, #5865f2, #7289da)', padding: '15px 30px', margin: '20px 0', borderRadius: '10px', fontSize: '18px' }}>
              <a href="https://discord.gg/PVrgZBmcMq" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
                🎮 JOIN DISCORD NOW
              </a>
            </div>
            
            <p style={{ color: '#a855f7', fontSize: '16px', marginTop: '15px' }}>
              ✨ <strong>What you can win:</strong> Exclusive card packs, promo cards, and special edition items!
            </p>
            
            <div style={{ background: 'rgba(168, 85, 247, 0.15)', padding: '15px', borderRadius: '8px', margin: '20px 0' }}>
              <p style={{ color: '#fcd34d', fontSize: '16px', margin: '0', fontWeight: 'bold' }}>
                🎯 <strong>Subscriber Bonus:</strong> As an email subscriber, you automatically get an <strong>extra entry</strong> in ALL Discord giveaways!
              </p>
            </div>
          </td>
        </tr>
      </table>

      {/* Pre-Launch Giveaways Section */}
      <table role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%">
        <tr>
          <td style={{ padding: '20px', background: 'rgba(124, 58, 237, 0.15)', borderRadius: '10px', margin: '20px' }}>
            <h3 style={{ color: '#fcd34d', fontSize: '24px', marginBottom: '15px', textAlign: 'center' }}>
              🎁 Join Discord for ALL Pre-Launch Giveaways!
            </h3>
            <p style={{ color: '#e2e8f0', fontSize: '16px', lineHeight: '1.6', textAlign: 'center' }}>
              This is just the beginning! As we approach our August 2025 launch, we&apos;ll be hosting <strong>bi-weekly giveaways </strong> 
              exclusively for our Discord community members. From rare card previews to limited edition items, 
              Discord members get first access to everything!
            </p>
            <ul style={{ color: '#e2e8f0', fontSize: '16px', lineHeight: '1.8', maxWidth: '400px', margin: '20px auto', textAlign: 'left' }}>
              <li>🎮 <strong>Bi-weekly Discord Giveaways</strong></li>
              <li>🃏 <strong>Exclusive Card Previews</strong></li>
              <li>⚡ <strong>Early Access Opportunities</strong></li>
              <li>👥 <strong>Community Game Nights</strong></li>
              <li>📢 <strong>Launch Day Special Events</strong></li>
            </ul>
          </td>
        </tr>
      </table>

      {/* Social Media Follow Section */}
      <table role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%">
        <tr>
          <td style={{ padding: '30px 20px', textAlign: 'center' }}>
            <h3 style={{ color: '#fcd34d', fontSize: '24px', marginBottom: '20px' }}>📱 Follow Us & Never Miss a Card Reveal!</h3>
            <p style={{ color: '#e2e8f0', fontSize: '16px', marginBottom: '25px' }}>
              Follow our social media for <strong>exclusive giveaways</strong>, card reveals, behind-the-scenes content, 
              and to never miss any announcements! Plus, social media followers get bonus opportunities in special contests!
            </p>
            
            <table role="presentation" cellSpacing="0" cellPadding="0" border="0" style={{ margin: '0 auto' }}>
              <tr>
                <td style={{ padding: '10px' }}>
                  <a href="https://www.tiktok.com/@elekin_tcg" 
                     style={{ 
                       display: 'inline-block', 
                       padding: '12px 25px', 
                       margin: '10px', 
                       background: 'linear-gradient(135deg, #ff0050, #ff4040)', 
                       color: 'white', 
                       textDecoration: 'none', 
                       borderRadius: '8px', 
                       fontWeight: 'bold' 
                     }}>
                    📱 Follow on TikTok
                  </a>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px' }}>
                  <a href="https://www.instagram.com/elekin_tcg/" 
                     style={{ 
                       display: 'inline-block', 
                       padding: '12px 25px', 
                       margin: '10px', 
                       background: 'linear-gradient(135deg, #e4405f, #f77737)', 
                       color: 'white', 
                       textDecoration: 'none', 
                       borderRadius: '8px', 
                       fontWeight: 'bold' 
                     }}>
                    📸 Follow on Instagram
                  </a>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px' }}>
                  <a href="https://www.facebook.com/elekin.tcg" 
                     style={{ 
                       display: 'inline-block', 
                       padding: '12px 25px', 
                       margin: '10px', 
                       background: 'linear-gradient(135deg, #1877f2, #42a5f5)', 
                       color: 'white', 
                       textDecoration: 'none', 
                       borderRadius: '8px', 
                       fontWeight: 'bold' 
                     }}>
                    👍 Like on Facebook
                  </a>
                </td>
              </tr>
            </table>
            
            <p style={{ color: '#a855f7', fontSize: '14px', marginTop: '20px' }}>
              Your follows and shares help us reach more TCG enthusiasts like you! 🚀
            </p>
          </td>
        </tr>
      </table>

      {/* Call to Action Summary */}
      <table role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%">
        <tr>
          <td style={{ padding: '20px', background: 'linear-gradient(135deg, #7c3aed, #a855f7)', textAlign: 'center', borderRadius: '10px', margin: '20px' }}>
            <h3 style={{ color: 'white', fontSize: '20px', marginBottom: '15px' }}>🚀 Don&apos;t Miss Out!</h3>
            <p style={{ color: 'white', fontSize: '16px', marginBottom: '20px' }}>
              Join our Discord community TODAY for your chance to win in our first giveaway and 
              stay connected for all future pre-launch events!
            </p>
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '15px 30px', margin: '20px 0', borderRadius: '10px', fontSize: '18px' }}>
              <a href="https://discord.gg/PVrgZBmcMq" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
                🎮 JOIN DISCORD - GIVEAWAY ENDING SOON!
              </a>
            </div>
          </td>
        </tr>
      </table>

      {/* Footer */}
      <table role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%">
        <tr>
          <td style={{ padding: '30px 20px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <p style={{ margin: '0 0 15px', color: '#9ca3af', fontSize: '14px' }}>
              ⚡ Launching August 2025! Get ready for the ultimate TCG experience! ⚡
            </p>
            <p style={{ margin: '0 0 15px', color: '#9ca3af', fontSize: '12px' }}>
              Elemental Games LLC © 2025. All rights reserved.
            </p>
            <p style={{ margin: '0', color: '#9ca3af', fontSize: '12px' }}>
              You received this email because you subscribed to Elekin TCG updates.
              <br /><br />
              <a href="#" style={{ color: '#a855f7', textDecoration: 'none' }}>Unsubscribe</a>
            </p>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default DiscordGiveawayEmail; 