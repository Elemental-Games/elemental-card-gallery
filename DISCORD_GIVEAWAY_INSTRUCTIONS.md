# 🎁 Discord Giveaway Email Instructions

## Quick Send Options

### Option 1: Manual Send via Resend Dashboard (FASTEST)
1. Go to [resend.com](https://resend.com) and log into your account
2. Click "Send" or "Create Campaign" 
3. **From:** `Elemental Games <noreply@elementalgames.gg>`
4. **Subject:** `🎁 FIRST Discord Giveaway at 12PM EST - Join Now!`
5. **Recipients:** Upload your subscriber CSV file (`elemental-subscribers-2025-06-30.csv`)
6. **Content:** Copy and paste the HTML from `discord-giveaway-email-template.html`
7. Click Send!

### Option 2: Fix Environment Variables & Use Automation

#### Step 1: Fix Your .env File
Your server is missing the Resend API key. Add this to your `.env` file:

```bash
# Add your Resend API key (get it from resend.com/api-keys)
RESEND_API_KEY=re_your_api_key_here

# Your existing Supabase variables should already be there:
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

#### Step 2: Restart Server & Send
```bash
# Stop current server
pkill -f "node server.js"

# Start server with environment variables
node server.js

# Send the Discord giveaway email
curl -X POST http://localhost:3001/api/send-discord-giveaway-email \
  -H "Content-Type: application/json" \
  -d '{}'
```

## Email Content Summary

Your Discord giveaway email includes:

✅ **Eye-catching header** with your branding  
✅ **Live countdown timer** to 12:00 PM EST  
✅ **Discord join button** (https://discord.gg/PVrgZBmcMq)  
✅ **Pre-launch giveaway section** - explains this is the first of many  
✅ **Social media follow section** with buttons for:
   - 📱 TikTok: @elekin_tcg
   - 📸 Instagram: @elekin_tcg  
   - 👍 Facebook: elekin.tcg
✅ **Professional footer** with unsubscribe link

## Subscriber List

You have **29 active subscribers** ready to receive this email:
- File: `elemental-subscribers-2025-06-30.csv`
- All have `status = 'active'` in your Supabase database

## Timing

The email automatically sets the countdown to:
- **12:00 PM EST today** (if it's before 12 PM)
- **12:00 PM EST tomorrow** (if it's after 12 PM today)

## After Sending

Once you send the email:

1. **Monitor Discord** for new joins at https://discord.gg/PVrgZBmcMq
2. **Run your giveaway** at exactly 12:00 PM EST
3. **Track engagement** - check who joins from the email
4. **Plan next giveaway** - this email mentions "weekly giveaways" so your community will expect more!

## Social Media Boost

The email encourages followers on:
- **TikTok:** https://www.tiktok.com/@elekin_tcg
- **Instagram:** https://www.instagram.com/elekin_tcg/  
- **Facebook:** https://www.facebook.com/elekin.tcg

Make sure to post about the giveaway on these platforms too!

## Need Help?

If you run into issues:
1. Check your Resend account has API credits
2. Verify your `.env` file has the correct API key
3. Make sure your server is running on port 3001
4. Test with a single email first before sending to all subscribers

**The email is ready to send - you just need to get it out there! 🚀** 