// supabase/functions/welcome-email/index.ts
import { serve } from "https://deno.fresh.dev/std@v1.0/http/server.ts"
import { Resend } from 'https://esm.sh/resend@2.0.0'

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

serve(async (req) => {
  if (req.method === 'POST') {
    try {
      const { email } = await req.json()
      
      const data = await resend.emails.send({
        from: 'Elemental Games <noreply@elementalgames.gg>',
        to: email,
        subject: 'Welcome to Elemental Masters!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <img src="https://elementalgames.gg/Games_Logo.png" alt="Elemental Games Logo" style="width: 200px; margin: 20px auto; display: block;">
            
            <h1 style="color: #6B46C1; text-align: center;">Welcome to Elemental Masters!</h1>
            
            <p>Thank you for subscribing to our newsletter! We're excited to have you join our growing community of Elemental Masters players.</p>
            
            <p>You'll be the first to know about:</p>
            <ul>
              <li>Our upcoming Kickstarter launch</li>
              <li>Exclusive card previews</li>
              <li>Tournament announcements</li>
              <li>Community events and news</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://elementalgames.gg/gameplay" 
                 style="background-color: #6B46C1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
                Learn How to Play
              </a>
            </div>
            
            <p>Connect with us:</p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="https://discord.gg/qXNWh4dMve" style="margin: 0 10px;">Discord</a>
              <a href="https://x.com/elemental_tcg" style="margin: 0 10px;">X (Twitter)</a>
            </div>
            
            <p style="font-size: 12px; color: #666; text-align: center; margin-top: 40px;">
              You received this email because you subscribed to Elemental Masters updates.
              <br>
              To unsubscribe, click <a href="https://elementalgames.gg/unsubscribe?email=${email}">here</a>.
            </p>
          </div>
        `
      })

      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200
      })
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500
      })
    }
  }

  return new Response('Method not allowed', { status: 405 })
})