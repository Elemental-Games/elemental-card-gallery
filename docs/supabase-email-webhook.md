# Setting Up Supabase Email Webhook

This guide explains how to set up a Supabase database webhook to send welcome emails when a new subscriber signs up. This approach avoids CORS issues by handling email sending on the server side.

## Prerequisites

- Access to your Supabase dashboard
- A Resend API key
- A web service or serverless function endpoint that can handle webhooks

## Method 1: Using Supabase Edge Functions (Recommended)

### Step 1: Create a New Edge Function

1. In your Supabase dashboard, go to **Edge Functions**
2. Click **Create a new function**
3. Name it `send-welcome-email`
4. Use the following code template:

```typescript
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { corsHeaders } from '../_shared/cors.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

// Create a Supabase client with the service role key for admin access
const supabase = createClient(supabaseUrl, supabaseServiceKey)

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email } = await req.json()
    
    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Elemental Games <contact@elementalgames.gg>',
        to: email,
        subject: '🔥 Welcome to the World of Elekin! 🌊',
        html: `
          <!-- Your HTML email template here -->
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1A103C; color: #fff; padding: 30px; border-radius: 15px; border: 2px solid #fcd34d;">
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="https://elementalgames.gg/logo.png" alt="Elemental Games Logo" style="max-width: 180px; margin-bottom: 15px;" />
              <h1 style="margin: 0; color: #fcd34d; font-size: 32px; text-transform: uppercase; letter-spacing: 2px; text-shadow: 0px 2px 4px rgba(0,0,0,0.5);">Welcome, Elemental Master!</h1>
            </div>

            <!-- Rest of your email HTML -->
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center; color: #9ca3af; font-size: 12px;">
              <p>⚡ Launching in <strong>June 2025</strong>! ⚡</p>
              <p style="color: #9ca3af; font-size: 11px;">Until Launch Month June 2025</p>
              <p>Elemental Games LLC © 2024. All rights reserved.</p>
              <p>You're receiving this email because you signed up for updates about Elekin: Masters of Kinbrold.</p>
            </div>
          </div>
        `
      })
    })

    const result = await response.json()
    
    return new Response(
      JSON.stringify({ success: true, result }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
```

5. Deploy the function

### Step 2: Set Environment Variables

In your Supabase project settings, add these environment variables:
- `RESEND_API_KEY` - Your Resend API key
- `SUPABASE_URL` - This is pre-filled
- `SUPABASE_SERVICE_ROLE_KEY` - This is pre-filled

### Step 3: Set Up a Database Trigger

1. Go to **Database** > **Triggers**
2. Create a new trigger:
   - Name: `after_insert_subscribers`
   - Table: `subscribers`
   - Events: `INSERT`
   - Webhook URL: The URL of your edge function
   - Payload template:
   ```json
   { "email": "{{new.email}}" }
   ```

## Method 2: Using External Webhook Service

If you prefer to use an external service like AWS Lambda, Vercel Functions, or your own server:

1. Create an endpoint that accepts POST requests
2. Secure it with an API key or other authentication method
3. Set up the Database Trigger as in Method 1, but point to your custom endpoint
4. Make sure your endpoint processes the webhook and sends the email

## Testing

To test your setup:
1. Insert a test record into the `subscribers` table
2. Check the logs of your edge function or webhook service
3. Verify that the test email is received

## Troubleshooting

- **Emails not sending**: Check your Resend dashboard for errors
- **Webhook not triggering**: Check the Supabase logs for the database trigger
- **Error in edge function**: Check the edge function logs in the Supabase dashboard

---

This approach removes the need to send emails directly from the client, avoiding CORS issues and providing a more reliable email delivery mechanism. 