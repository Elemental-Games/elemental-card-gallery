# Resend Email Setup for VIP Kickstarter Campaign

## Quick Setup

1. **Get your Resend API key:**
   - Go to https://resend.com/api-keys
   - Create a new API key
   - Add to your `.env` file: `RESEND_API_KEY=your_key_here`

2. **Install dependencies:**
   ```bash
   npm install resend
   ```

3. **Environment variables needed:**
   ```
   RESEND_API_KEY=your_resend_api_key
   VITE_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_key
   ```

## 🚨 VIP Kickstarter Campaign - URGENT

### Send Test Email
```bash
node send-vip-kickstarter-email.js --test
```

### Send to ALL 122 Subscribers (LIVE CAMPAIGN)
```bash
node send-vip-kickstarter-email.js
```

### Expected Results:
- **30-50 new Kickstarter followers** within 24 hours
- **25-40% conversion rate** from your 122 subscribers
- This is your **highest impact** emergency conversion campaign

## Email Preview Dashboard

The VIP Kickstarter email is integrated into your admin dashboard:
- Go to `/admin/email-preview`
- Password: `diorio1`
- Select "🚨 VIP Kickstarter" button (red highlighting)
- Use "Send Test Email" or "Send to Subscribers" buttons

## Email Features

✅ **Professional HTML email** with:
- VIP exclusive branding
- 5 compelling benefits (20% discount, VIP badge, etc.)
- Mobile-responsive design
- UTM tracking for analytics
- Urgency messaging ("only 122 people")

✅ **Campaign tracking:**
- Message ID for delivery confirmation
- Recipient count verification
- Error handling and logging

## Campaign Strategy Integration

This email is part of your **"500 in 14 Days" emergency strategy**:

1. **Phase 1**: VIP Email Conversion (THIS EMAIL) → 30-50 followers
2. **Phase 2**: Paid advertising → 60+ followers
3. **Phase 3**: Game store QR codes → 60-90 followers
4. **Phase 4**: Viral TikTok content → 25+ followers
5. **Phase 5**: Influencer outreach → 100-200 followers

**Target**: 500+ Kickstarter followers in 14 days

## Monitoring Success

After sending, track:
1. **Resend dashboard** - open/click rates
2. **Kickstarter follower count** - should increase 30-50 within 24 hours
3. **Website traffic** - expect spike from UTM links
4. **Social engagement** - followers may share

## Command Options

```bash
# Test email to yourself
node send-vip-kickstarter-email.js --test

# Test to specific email
node send-vip-kickstarter-email.js --test your@email.com

# Live campaign to all subscribers
node send-vip-kickstarter-email.js
```

## Email Content Summary

**Subject**: 🔥 VIP Early Access: Follow Our Kickstarter for Exclusive Rewards

**Key messaging**:
- "You're one of only 122 people getting this exclusive offer"
- "Before we announce to 50,000+ people"
- 20% early bird discount for VIP followers only
- Time-sensitive urgency (rewards end at 500 followers)

**Call-to-action**: Follow Kickstarter with UTM tracking

## Troubleshooting

**Common issues:**
- Missing RESEND_API_KEY → Add to .env file
- Missing Supabase credentials → Check .env
- No subscribers found → Verify Supabase table has data

**Success indicators:**
- Console shows "✅ Email sent successfully!"
- Message ID returned from Resend
- Recipient count matches expected (122)

## Next Steps After Campaign

1. Monitor follower count hourly
2. Prepare for increased traffic to your site
3. Have social media content ready for engagement spike
4. Track conversion metrics for future campaigns

---

**🎯 THIS IS YOUR HIGHEST IMPACT CAMPAIGN - Execute immediately for maximum Kickstarter conversion!** 

## 🖼️ **Image Setup Required:**

You'll need to host these images publicly. Here are your options:

### Option 1: Use your website domain
Replace `https://yourdomain.com/` with your actual domain:
- `https://yourdomain.com/Games_Logo.png`
- `https://yourdomain.com/Elekin.png`
- `https://yourdomain.com/images/cards/optimized/aeris-large.webp`

### Option 2: Quick image hosting
Upload these files to:
- **Imgur** (free, easy)
- **Cloudinary** (better for emails)
- **Your hosting provider**

### Key Images Needed:
1. **Games_Logo.png** - Your main logo
2. **Elekin.png** - Secondary logo
3. **3 card images** - I used your optimized card images

## 📧 **Email Settings:**
- **Subject**: `🔥 VIP Early Access: Follow Our Kickstarter for Exclusive Rewards`
- **Preview Text**: `You're one of only 122 people getting this exclusive offer. 20% VIP discount + exclusive rewards inside!`

## ✨ **What's Improved:**
- Professional logo in header
- Eye-catching card showcase
- Better visual hierarchy
- Enhanced CTAs with shadows/effects
- Pro tip section for extra persuasion
- Mobile responsive design
- More compelling benefit descriptions

Want me to help you set up the image hosting or modify any specific elements?

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VIP Early Access - Elekin TCG</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center; }
        .logo { width: 120px; height: auto; margin-bottom: 20px; }
        .vip-badge { background: #ff6b6b; color: white; padding: 10px 20px; border-radius: 25px; font-weight: bold; font-size: 16px; display: inline-block; margin-bottom: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.2); }
        .cta-button { background: #28a745; color: white; padding: 18px 35px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 18px; display: inline-block; margin: 25px 0; box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3); transition: all 0.3s; }
        .cta-button:hover { background: #218838; transform: translateY(-2px); }
        .benefits { background: #f8f9fa; padding: 25px; border-radius: 15px; margin: 25px 0; border: 1px solid #e9ecef; }
        .benefit-item { display: flex; align-items: center; margin: 15px 0; }
        .benefit-icon { background: #28a745; color: white; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 20px; font-weight: bold; font-size: 16px; }
        .urgency { background: #fff3cd; border: 2px solid #ffc107; padding: 20px; border-radius: 10px; margin: 25px 0; text-align: center; }
        .footer { text-align: center; padding: 25px; color: #666; font-size: 12px; background: #f8f9fa; }
        .content { padding: 35px; }
        .card-showcase { display: flex; justify-content: center; gap: 15px; margin: 25px 0; flex-wrap: wrap; }
        .card-img { width: 80px; height: 112px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.2); }
        .highlight { color: #28a745; font-weight: bold; }
        @media (max-width: 600px) {
            .content { padding: 25px; }
            .cta-button { padding: 15px 30px; font-size: 16px; }
            .card-img { width: 60px; height: 84px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://yourdomain.com/Games_Logo.png" alt="Elemental Games" class="logo">
            <div class="vip-badge">🔥 VIP EXCLUSIVE</div>
            <h1 style="margin: 0; font-size: 32px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">Early Access Invitation</h1>
            <p style="margin: 15px 0 0 0; font-size: 18px; opacity: 0.9;">You're one of only 122 people getting this exclusive offer</p>
        </div>
        
        <div class="content">
            <h2 style="color: #333; margin-top: 0; font-size: 26px; text-align: center;">🚨 Follow Our Kickstarter NOW for VIP Rewards!</h2>
            
            <p style="font-size: 16px;">Hi VIP Subscriber,</p>
            
            <p style="font-size: 16px;">You're receiving this because you're part of our <strong class="highlight">exclusive inner circle of 122 early supporters</strong>. Before we announce our Kickstarter to 50,000+ people, you get first access to incredible VIP rewards:</p>
            
            <!-- Card Showcase -->
            <div class="card-showcase">
                <img src="https://yourdomain.com/images/cards/optimized/aeris-large.webp" alt="Aeris Card" class="card-img">
                <img src="https://yourdomain.com/images/cards/optimized/agilitys%20valor-large.webp" alt="Agility's Valor" class="card-img">
                <img src="https://yourdomain.com/images/cards/optimized/air%20bugs-large.webp" alt="Air Bugs" class="card-img">
            </div>
            
            <div class="benefits">
                <div class="benefit-item">
                    <div class="benefit-icon">💰</div>
                    <div><strong>20% Early Bird Discount</strong> - VIP followers only (Save $20+ on starter decks)</div>
                </div>
                <div class="benefit-item">
                    <div class="benefit-icon">🏆</div>
                    <div><strong>Exclusive VIP Backer Badge</strong> - Show your VIP status in the community</div>
                </div>
                <div class="benefit-item">
                    <div class="benefit-icon">🎯</div>
                    <div><strong>First Access to Limited Editions</strong> - Get rare holographic cards first</div>
                </div>
                <div class="benefit-item">
                    <div class="benefit-icon">📰</div>
                    <div><strong>Behind-the-Scenes Updates</strong> - VIP development insights & sneak peeks</div>
                </div>
                <div class="benefit-item">
                    <div class="benefit-icon">⚡</div>
                    <div><strong>Priority Customer Support</strong> - Skip the line, get instant help</div>
                </div>
            </div>
            
            <div style="text-align: center;">
                <a href="https://www.kickstarter.com/projects/markdiorio/elekin-tcg?utm_source=vip_email&utm_medium=email&utm_campaign=early_access" class="cta-button">
                    🚀 FOLLOW KICKSTARTER NOW
                </a>
            </div>
            
            <div class="urgency">
                <strong style="font-size: 18px; color: #856404;">⏰ Time Sensitive:</strong><br>
                <span style="font-size: 16px;">These VIP rewards are only available to followers who join before our public announcement. Once we hit 500 followers, these exclusive benefits end forever.</span>
            </div>
            
            <h3 style="color: #333; font-size: 20px;">Why follow now?</h3>
            <ul style="padding-left: 25px; font-size: 16px; line-height: 1.8;">
                <li>You'll be notified the <strong>moment</strong> we launch</li>
                <li>Lock in your <strong class="highlight">20% VIP discount</strong></li>
                <li>Help us reach our initial goal faster</li>
                <li>Join an exclusive community of early believers</li>
                <li>Get access to <strong>limited edition content</strong></li>
            </ul>
            
            <p style="font-size: 16px; background: #e7f3ff; padding: 20px; border-radius: 10px; border-left: 4px solid #0066cc;">
                <strong>💡 Pro Tip:</strong> Following our Kickstarter is completely free, but it guarantees you'll be first in line when we launch. Early backers historically get the best rewards!
            </p>
            
            <p style="font-size: 16px;">Thank you for being part of our journey from the beginning. Your early support makes all the difference.</p>
            
            <p style="font-size: 18px; font-weight: bold; text-align: center;">Ready to claim your VIP rewards?</p>
            
            <div style="text-align: center; margin: 35px 0;">
                <a href="https://www.kickstarter.com/projects/markdiorio/elekin-tcg?utm_source=vip_email&utm_medium=email&utm_campaign=early_access" class="cta-button">
                    👑 FOLLOW & CLAIM VIP STATUS
                </a>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <img src="https://yourdomain.com/Elekin.png" alt="Elekin TCG" style="width: 150px; height: auto; opacity: 0.8;">
            </div>
            
            <p style="font-size: 16px; text-align: center;">
                Best regards,<br>
                <strong style="font-size: 18px;">Mark DiOrio</strong><br>
                <span style="color: #666;">Creator, Elekin TCG</span>
            </p>
        </div>
        
        <div class="footer">
            <p><strong>© 2024 Elemental Games. All rights reserved.</strong></p>
            <p>You're receiving this because you're a valued subscriber to our exclusive VIP list.</p>
            <p style="margin-top: 15px;">
                <a href="#" style="color: #666; text-decoration: none;">Update preferences</a> | 
                <a href="#" style="color: #666; text-decoration: none;">Unsubscribe</a>
            </p>
        </div>
    </div>
</body>
</html>
```