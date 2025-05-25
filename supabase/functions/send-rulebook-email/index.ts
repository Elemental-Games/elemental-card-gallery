import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { Resend } from 'https://esm.sh/resend@2.0.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
  };
  
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders
    });
  }
  
  try {
    const { email } = await req.json();
    const normalizedEmail = email.toLowerCase().trim();

    // Check if user is already subscribed
    const { data: existingSubscriber, error: checkError } = await supabase
      .from('subscribers')
      .select('email')
      .eq('email', normalizedEmail)
      .maybeSingle();

    if (checkError) {
      console.error('Error checking subscriber:', checkError);
    }

    const isNewSubscriber = !existingSubscriber;

    // If it's a new subscriber, add them to the database
    if (isNewSubscriber) {
      const { error: insertError } = await supabase
        .from('subscribers')
        .insert([{
          email: normalizedEmail,
          status: 'active',
          subscribed_at: new Date().toISOString()
        }]);

      if (insertError && insertError.code !== '23505') { // Ignore duplicate errors
        console.error('Error inserting subscriber:', insertError);
      }
    }

    // Fetch the rulebook PDF from the public directory
    let rulebookAttachment;
    
    try {
      // Try multiple sources for the PDF
      const possibleUrls = [
        'https://elementalgames.gg/data/TCG%20Rulebook.pdf',
        'https://raw.githubusercontent.com/Elemental-Games/elemental-card-gallery/main/public/data/TCG%20Rulebook.pdf'
      ];
      
      let pdfResponse;
      let successUrl;
      for (const url of possibleUrls) {
        try {
          console.log(`Attempting to fetch PDF from: ${url}`);
          pdfResponse = await fetch(url);
          console.log(`Response status: ${pdfResponse.status} for ${url}`);
          if (pdfResponse.ok) {
            successUrl = url;
            break;
          }
        } catch (e) {
          console.log(`Failed to fetch from ${url}:`, e.message);
        }
      }
      
      if (pdfResponse && pdfResponse.ok) {
        console.log(`Successfully fetched PDF from: ${successUrl}`);
        const pdfArrayBuffer = await pdfResponse.arrayBuffer();
        const pdfBytes = new Uint8Array(pdfArrayBuffer);
        console.log(`PDF size: ${pdfBytes.length} bytes`);
        
        // Convert to base64 properly for Resend
        let binaryString = '';
        for (let i = 0; i < pdfBytes.length; i++) {
          binaryString += String.fromCharCode(pdfBytes[i]);
        }
        const base64Pdf = btoa(binaryString);
        
        rulebookAttachment = {
          filename: 'Elekin_Rulebook.pdf',
          content: base64Pdf,
          type: 'application/pdf',
        };
        console.log('PDF attachment prepared successfully');
      } else {
        console.error('Could not fetch PDF from any source');
      }
    } catch (error) {
      console.error('Error preparing PDF attachment:', error);
      rulebookAttachment = null;
    }

    // Create unsubscribe token
    const timestamp = Date.now().toString();
    const randomString = Math.random().toString(36).substring(2, 15);
    const unsubscribeToken = `${timestamp}-${randomString}`;

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0f0729; color: #e5e7eb;">
        <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #7c3aed;">
          <h1 style="color: #fbbf24; font-size: 28px; margin: 0; text-shadow: 0 0 10px rgba(251, 191, 36, 0.5);">
            Elekin: Masters of Kinbrold
          </h1>
          <p style="color: #a855f7; font-size: 16px; margin: 5px 0 0 0;">Complete Rulebook</p>
        </div>

        <div style="padding: 30px 0;">
          <h2 style="color: #fbbf24; font-size: 22px; margin-bottom: 15px;">📖 Your Complete Rulebook is Here!</h2>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px; color: #e5e7eb;">
            Thank you for your interest in Elekin! We've attached the complete rulebook PDF to this email.
          </p>

          <div style="background-color: #1e1b4b; padding: 20px; border-radius: 8px; border-left: 4px solid #fbbf24; margin: 20px 0;">
            <h3 style="color: #fbbf24; margin: 0 0 10px 0;">📎 Attached:</h3>
            <p style="color: #e5e7eb; margin: 0 0 15px 0;"><strong>Elekin_Rulebook.pdf</strong> - Complete game guide</p>
            <h3 style="color: #fbbf24; margin: 15px 0 10px 0;">What's Inside:</h3>
            <ul style="color: #e5e7eb; padding-left: 20px; margin: 0;">
              <li style="margin-bottom: 8px;">Complete game rules and mechanics</li>
              <li style="margin-bottom: 8px;">Card types and abilities guide</li>
              <li style="margin-bottom: 8px;">Strategy tips and deck building advice</li>
              <li style="margin-bottom: 8px;">Lore and world-building content</li>
              <li style="margin-bottom: 8px;">Tournament rules and formats</li>
            </ul>
          </div>

          <div style="background-color: #422006; padding: 20px; border-radius: 8px; border: 2px solid #fbbf24; margin: 20px 0;">
            <h3 style="color: #fbbf24; margin: 0 0 15px 0; text-align: center;">🎮 Ready to Play?</h3>
            <p style="margin: 0 0 15px 0; text-align: center; color: #e5e7eb;">
              Join our community and be part of the Elekin journey!
            </p>
            <div style="text-align: center;">
              <a href="https://discord.gg/PVrgZBmcMq" style="color: #fbbf24; text-decoration: none; margin: 0 15px; font-weight: bold;">🎮 Discord</a>
              <a href="https://www.tiktok.com/@elekin_tcg" style="color: #fbbf24; text-decoration: none; margin: 0 15px; font-weight: bold;">📱 TikTok</a>
              <a href="https://www.instagram.com/elekin_tcg/" style="color: #fbbf24; text-decoration: none; margin: 0 15px; font-weight: bold;">📸 Instagram</a>
            </div>
          </div>

          ${isNewSubscriber ? `
          <div style="background-color: #1e1b4b; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #a855f7; margin: 0 0 15px 0;">🎉 Welcome to the Community!</h3>
            <p style="margin: 0 0 15px 0; color: #e5e7eb;">
              We've added you to our mailing list! You'll receive:
            </p>
            <ul style="color: #e5e7eb; padding-left: 20px; margin: 0;">
              <li style="margin-bottom: 8px;">Exclusive card reveals</li>
              <li style="margin-bottom: 8px;">Strategy guides and tips</li>
              <li style="margin-bottom: 8px;">Tournament announcements</li>
              <li style="margin-bottom: 8px;">Early access to new content</li>
            </ul>
          </div>
          ` : `
          <div style="background-color: #1e1b4b; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #a855f7; margin: 0 0 15px 0;">👋 Welcome Back!</h3>
            <p style="margin: 0; color: #e5e7eb;">
              Thanks for downloading the rulebook again! As a valued community member, keep an eye out for our latest updates and card reveals.
            </p>
          </div>
          `}
        </div>

        <div style="text-align: center; padding: 20px 0; border-top: 1px solid #374151;">
          <p style="font-size: 12px; color: #9ca3af; margin: 0;">
            You received this email because you requested the Elekin rulebook.
            <br><br>
            <a href="https://elementalgames.gg/unsubscribe?email=${email}&token=${unsubscribeToken}" style="color: #a855f7; text-decoration: none;">Unsubscribe</a>
          </p>
        </div>
      </div>
    `;

    // Send the rulebook email with attachment
    const emailData = {
      from: 'Elemental Games <noreply@elementalgames.gg>',
      to: email,
      subject: '📖 Your Elekin Rulebook is Ready!',
      html: emailContent,
    } as any;

    // Add attachment if PDF was successfully fetched
    if (rulebookAttachment) {
      emailData.attachments = [rulebookAttachment];
    }

    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      throw error;
    }

    // Send welcome email only for new subscribers
    if (isNewSubscriber) {
      try {
        const welcomeResponse = await fetch(`${supabaseUrl}/functions/v1/send-welcome-email`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${supabaseServiceKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: normalizedEmail })
        });
        
        if (!welcomeResponse.ok) {
          console.log('Welcome email failed but rulebook was sent successfully');
        }
      } catch (welcomeError) {
        console.log('Welcome email failed but rulebook was sent successfully:', welcomeError);
      }
    }

    return new Response(JSON.stringify({
      success: true,
      data,
      isNewSubscriber,
      message: isNewSubscriber 
        ? 'Rulebook sent with attachment! Welcome email also sent.' 
        : 'Rulebook sent with attachment! You were already subscribed.'
    }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      },
      status: 200
    });

  } catch (error) {
    console.error('Error sending rulebook email:', error);
    return new Response(JSON.stringify({
      error: error.message
    }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      },
      status: 500
    });
  }
}); 