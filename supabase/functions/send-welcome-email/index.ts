import { serve } from 'https://deno.land/std@v1.0.0/http/server.ts'
import { Resend } from 'https://esm.sh/resend@2.0.0'

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email } = await req.json()
    
    const { data, error } = await resend.emails.send({
      from: 'Elemental Masters <noreply@elementalgames.gg>',
      to: email,
      subject: 'Welcome to Elemental Masters!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #6d28d9;">Welcome to Elemental Masters!</h1>
          <p>Thank you for joining our community!</p>
          <p>Stay tuned for updates about:</p>
          <ul>
            <li>Our upcoming Kickstarter launch</li>
            <li>Exclusive card previews</li>
            <li>Community events</li>
          </ul>
          <div style="margin: 20px 0;">
            <p>Connect with us:</p>
            <a href="https://x.com/elemental_tcg" style="color: #6d28d9;">Twitter</a> | 
            <a href="https://discord.gg/qXNWh4dMve" style="color: #6d28d9;">Discord</a>
          </div>
        </div>
      `
    })

    if (error) {
      throw error
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    })
  }
})
