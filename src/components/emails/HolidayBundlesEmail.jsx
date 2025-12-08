const HolidayBundlesEmail = () => {
  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      backgroundColor: '#1A103C',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      {/* Email Header */}
      <div style={{
        background: 'linear-gradient(135deg, #8A2BE2 0%, #f59e0b 100%)',
        color: '#ffffff',
        padding: '30px 20px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Main Logo - Icon */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <img 
            src="/Elekin_Icon.png" 
            alt="Elekin TCG" 
            style={{ maxWidth: '200px', height: 'auto', margin: '0 auto 15px', display: 'block' }}
          />
          <h1 style={{ margin: 0, fontSize: '36px', fontWeight: 'bold', letterSpacing: '2px' }}>
            🎁 HOLIDAY BUNDLES
          </h1>
          <p style={{ margin: '10px 0 0', fontSize: '20px', opacity: 0.95 }}>
            Save Up to $30 on Curated Bundles!
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <div style={{ padding: '40px 30px', textAlign: 'center', backgroundColor: '#1A103C' }}>
        <h2 style={{ margin: '0 0 20px', color: '#f59e0b', fontSize: '40px', fontWeight: 'bold', lineHeight: 1.2 }}>
          Perfect Gifts for TCG Players!
        </h2>
        <p style={{ margin: 0, color: '#e0d4ff', fontSize: '24px', lineHeight: 1.7, padding: '0 10px' }}>
          Everything you need to start playing Elekin TCG - now at special holiday pricing!
        </p>
      </div>

      {/* 2-Player Bundle (Featured) */}
      <div style={{ padding: '0 20px 30px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #8A2BE2 0%, #f59e0b 100%)',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '3px solid #f59e0b',
          textAlign: 'center'
        }}>
          {/* Bundle Image */}
          <img 
            src="/images/products/in-person/x-13image.png" 
            alt="2-Player Holiday Bundle" 
            style={{ 
              width: '100%', 
              height: 'auto', 
              display: 'block',
              maxHeight: '300px',
              objectFit: 'contain'
            }}
          />
          <div style={{ padding: '30px' }}>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
                ⭐ PREMIUM BUNDLE
              </span>
            </div>
            <h3 style={{ margin: '0 0 15px', color: '#ffffff', fontSize: '32px', fontWeight: 'bold' }}>
              2-Player Holiday Bundle
            </h3>
            <p style={{ margin: '0 0 20px', color: '#ffffff', fontSize: '18px', opacity: 0.95 }}>
              Perfect for friends, couples, or anyone who wants both decks!
            </p>
          
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            padding: '20px',
            borderRadius: '8px',
            margin: '20px 0'
          }}>
            <p style={{ margin: '0 0 10px', color: '#ffffff', fontSize: '16px' }}>
              <strong>What's Included:</strong>
            </p>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#ffffff', textAlign: 'left', fontSize: '15px', lineHeight: 1.8 }}>
              <li>Dumoles Game Mat & Token Set</li>
              <li>Guardian's Sanctuary Game Mat & Token Set</li>
              <li>Crystal Starter Deck</li>
              <li>Lightning Starter Deck</li>
              <li>6 Booster Packs (3 for each player)</li>
            </ul>
          </div>

          <div style={{ margin: '25px 0' }}>
            <p style={{ margin: '0 0 5px', color: '#ffffff', fontSize: '24px', fontWeight: 'bold' }}>$90</p>
            <p style={{ margin: 0, color: '#ffffff', fontSize: '18px', textDecoration: 'line-through', opacity: 0.7 }}>
              Regular: $120
            </p>
            <p style={{ margin: '10px 0 0', color: '#4ade80', fontSize: '20px', fontWeight: 'bold' }}>
              Save $30! 🎉
            </p>
          </div>

          <div style={{
            padding: '15px 40px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            margin: '25px auto 0',
            display: 'inline-block'
          }}>
            <a 
              href="https://elementalgames.gg/bundle/bundle_2player?utm_source=email&utm_medium=holiday&utm_campaign=bundles"
              style={{
                color: '#8A2BE2',
                textDecoration: 'none',
                fontSize: '18px',
                fontWeight: 'bold',
                display: 'block'
              }}
            >
              Shop 2-Player Bundle →
            </a>
          </div>
        </div>
      </div>

      {/* Other Bundles */}
      <div style={{ padding: '0 20px 30px' }}>
        <h3 style={{ margin: '0 0 25px', color: '#f59e0b', fontSize: '28px', fontWeight: 'bold', textAlign: 'center' }}>
          Starter Bundles - $50 Each
        </h3>
        
        {/* Dumoles Bundle */}
        <div style={{
          marginBottom: '25px',
          backgroundColor: '#2d1b4e',
          borderRadius: '12px',
          border: '2px solid #8A2BE2',
          overflow: 'hidden'
        }}>
          {/* Bundle Image */}
          <img 
            src="/images/products/in-person/x-12image.png" 
            alt="Dumoles Holiday Bundle" 
            width="600"
            style={{ 
              width: '100%', 
              maxWidth: '600px',
              height: 'auto', 
              display: 'block',
              border: 0,
              outline: 'none',
              backgroundColor: '#2d1b4e'
            }}
          />
          <div style={{ padding: '25px' }}>
            <h4 style={{ margin: '0 0 10px', color: '#f59e0b', fontSize: '24px', fontWeight: 'bold' }}>
              Dumoles Holiday Bundle
            </h4>
            <p style={{ margin: '0 0 15px', color: '#e0d4ff', fontSize: '16px' }}>
              Perfect starter bundle for Crystal players!
            </p>
          
          <div style={{
            backgroundColor: 'rgba(138, 43, 226, 0.2)',
            padding: '15px',
            borderRadius: '8px',
            margin: '15px 0'
          }}>
            <p style={{ margin: '0 0 8px', color: '#ffffff', fontSize: '14px', fontWeight: 'bold' }}>Includes:</p>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#e0d4ff', fontSize: '14px', lineHeight: 1.6 }}>
              <li>Dumoles Game Mat & Token Set</li>
              <li>3 Booster Packs</li>
              <li>Crystal Starter Deck</li>
            </ul>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' }}>
            <div>
              <p style={{ margin: 0, color: '#f59e0b', fontSize: '28px', fontWeight: 'bold' }}>$50</p>
              <p style={{ margin: '5px 0 0', color: '#9ca3af', fontSize: '16px', textDecoration: 'line-through' }}>$60</p>
            </div>
            <p style={{ margin: 0, color: '#4ade80', fontSize: '16px', fontWeight: 'bold' }}>Save $10!</p>
          </div>

          <div style={{
            padding: '12px 30px',
            backgroundColor: '#f59e0b',
            borderRadius: '6px',
            margin: '0 auto',
            display: 'inline-block'
          }}>
            <a 
              href="https://elementalgames.gg/bundle/bundle_dumoles?utm_source=email&utm_medium=holiday&utm_campaign=bundles"
              style={{
                color: '#1A103C',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 'bold',
                display: 'block'
              }}
            >
              Shop Now →
            </a>
          </div>
        </div>

        {/* Guardian Bundle */}
        <div style={{
          marginBottom: '25px',
          backgroundColor: '#2d1b4e',
          borderRadius: '12px',
          border: '2px solid #8A2BE2',
          overflow: 'hidden'
        }}>
          {/* Bundle Image */}
          <img 
            src="/images/products/in-person/x-11image.png" 
            alt="Guardian Holiday Bundle" 
            width="600"
            style={{ 
              width: '100%', 
              maxWidth: '600px',
              height: 'auto', 
              display: 'block',
              border: 0,
              outline: 'none',
              backgroundColor: '#2d1b4e'
            }}
          />
          <div style={{ padding: '25px' }}>
            <h4 style={{ margin: '0 0 10px', color: '#f59e0b', fontSize: '24px', fontWeight: 'bold' }}>
              Guardian Holiday Bundle
            </h4>
            <p style={{ margin: '0 0 15px', color: '#e0d4ff', fontSize: '16px' }}>
              Perfect starter bundle for Lightning players!
            </p>
          
          <div style={{
            backgroundColor: 'rgba(138, 43, 226, 0.2)',
            padding: '15px',
            borderRadius: '8px',
            margin: '15px 0'
          }}>
            <p style={{ margin: '0 0 8px', color: '#ffffff', fontSize: '14px', fontWeight: 'bold' }}>Includes:</p>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#e0d4ff', fontSize: '14px', lineHeight: 1.6 }}>
              <li>Guardian's Sanctuary Game Mat & Token Set</li>
              <li>3 Booster Packs</li>
              <li>Lightning Starter Deck</li>
            </ul>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' }}>
            <div>
              <p style={{ margin: 0, color: '#f59e0b', fontSize: '28px', fontWeight: 'bold' }}>$50</p>
              <p style={{ margin: '5px 0 0', color: '#9ca3af', fontSize: '16px', textDecoration: 'line-through' }}>$60</p>
            </div>
            <p style={{ margin: 0, color: '#4ade80', fontSize: '16px', fontWeight: 'bold' }}>Save $10!</p>
          </div>

          <div style={{
            padding: '12px 30px',
            backgroundColor: '#f59e0b',
            borderRadius: '6px',
            margin: '0 auto',
            display: 'inline-block'
          }}>
            <a 
              href="https://elementalgames.gg/bundle/bundle_guardian?utm_source=email&utm_medium=holiday&utm_campaign=bundles"
              style={{
                color: '#1A103C',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 'bold',
                display: 'block'
              }}
            >
              Shop Now →
            </a>
          </div>
        </div>

        {/* Pack Bundle */}
        <div style={{
          marginBottom: '25px',
          backgroundColor: '#2d1b4e',
          borderRadius: '12px',
          border: '2px solid #8A2BE2',
          overflow: 'hidden'
        }}>
          {/* Bundle Image */}
          <img 
            src="/images/products/in-person/x-12packs.png" 
            alt="Holiday Pack Bundle" 
            style={{ 
              width: '100%', 
              height: 'auto', 
              display: 'block',
              maxHeight: '300px',
              objectFit: 'cover'
            }}
          />
          <div style={{ padding: '25px' }}>
            <h4 style={{ margin: '0 0 10px', color: '#f59e0b', fontSize: '24px', fontWeight: 'bold' }}>
              Holiday Pack Bundle
            </h4>
            <p style={{ margin: '0 0 15px', color: '#e0d4ff', fontSize: '16px' }}>
              Stock up on cards - 12 packs for the price of 10!
            </p>
          
          <div style={{
            backgroundColor: 'rgba(138, 43, 226, 0.2)',
            padding: '15px',
            borderRadius: '8px',
            margin: '15px 0'
          }}>
            <p style={{ margin: '0 0 8px', color: '#ffffff', fontSize: '14px', fontWeight: 'bold' }}>Includes:</p>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#e0d4ff', fontSize: '14px', lineHeight: 1.6 }}>
              <li>12 Booster Packs (Demo Day Edition)</li>
              <li style={{ color: '#4ade80', fontWeight: 'bold' }}>That's 2 packs FREE! 🎁</li>
            </ul>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' }}>
            <div>
              <p style={{ margin: 0, color: '#f59e0b', fontSize: '28px', fontWeight: 'bold' }}>$50</p>
              <p style={{ margin: '5px 0 0', color: '#9ca3af', fontSize: '16px', textDecoration: 'line-through' }}>$60</p>
            </div>
            <p style={{ margin: 0, color: '#4ade80', fontSize: '16px', fontWeight: 'bold' }}>Save $10!</p>
          </div>

          <div style={{
            padding: '12px 30px',
            backgroundColor: '#f59e0b',
            borderRadius: '6px',
            margin: '0 auto',
            display: 'inline-block'
          }}>
            <a 
              href="https://elementalgames.gg/bundle/bundle_packs?utm_source=email&utm_medium=holiday&utm_campaign=bundles"
              style={{
                color: '#1A103C',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 'bold',
                display: 'block'
              }}
            >
              Shop Now →
            </a>
          </div>
        </div>
      </div>

      {/* Main CTA */}
      <div style={{ padding: '0 20px 40px', textAlign: 'center' }}>
        <div style={{
          padding: '18px 50px',
          background: 'linear-gradient(135deg, #8A2BE2 0%, #f59e0b 100%)',
          borderRadius: '8px',
          display: 'inline-block'
        }}>
          <a 
            href="https://elementalgames.gg/shop?utm_source=email&utm_medium=holiday&utm_campaign=bundles"
            style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '20px',
              fontWeight: 'bold',
              display: 'block'
            }}
          >
            View All Holiday Bundles →
          </a>
        </div>
      </div>

      {/* Shipping Info */}
      <div style={{ padding: '0 20px 30px' }}>
        <div style={{
          backgroundColor: 'rgba(138, 43, 226, 0.1)',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center'
        }}>
          <p style={{ margin: '0 0 8px', color: '#f59e0b', fontSize: '16px', fontWeight: 'bold' }}>
            🚚 Fast Shipping
          </p>
          <p style={{ margin: 0, color: '#e0d4ff', fontSize: '14px' }}>
            Ships in 3-5 business days • 30-day return policy
          </p>
        </div>
      </div>

      {/* Social Links */}
      <div style={{ 
        padding: '0 20px 30px', 
        textAlign: 'center', 
        borderTop: '1px solid rgba(138, 43, 226, 0.3)', 
        paddingTop: '30px' 
      }}>
        <p style={{ margin: '0 0 15px', color: '#e0d4ff', fontSize: '16px', fontWeight: 'bold' }}>
          Follow Us for Updates & Giveaways
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <a href="https://discord.gg/PVrgZBmcMq" style={{ color: '#8A2BE2', textDecoration: 'none', fontSize: '14px' }}>
            Discord
          </a>
          <a href="https://x.com/elekin_tcg" style={{ color: '#8A2BE2', textDecoration: 'none', fontSize: '14px' }}>
            Twitter
          </a>
          <a href="https://www.instagram.com/elekin_tcg/" style={{ color: '#8A2BE2', textDecoration: 'none', fontSize: '14px' }}>
            Instagram
          </a>
          <a href="https://www.tiktok.com/@elekin_tcg" style={{ color: '#8A2BE2', textDecoration: 'none', fontSize: '14px' }}>
            TikTok
          </a>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        backgroundColor: '#0f071f',
        padding: '30px 20px',
        textAlign: 'center',
        color: '#9ca3af',
        fontSize: '12px'
      }}>
        <p style={{ margin: '0 0 10px' }}>
          You received this email because you subscribed to Elekin TCG updates.
        </p>
        <p style={{ margin: '0 0 10px' }}>
          Questions? Reply to this email - we read every message!
        </p>
        <a href="https://elementalgames.gg/unsubscribe" style={{ color: '#8A2BE2', textDecoration: 'underline' }}>
          Unsubscribe
        </a>
      </div>
    </div>
  );
};

export default HolidayBundlesEmail;

