// Supabase Edge Function: lead-notification
// Triggered on new waitlist or newsletter subscription inquiry via Resend Automation
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { record } = await req.json();

    const clientEmail = record.email || record.full_name;
    const clientName = record.full_name || "Valued Practitioner";
    const serviceName = record.service_id || "Somatic Yoga Mentorship";
    const goals = record.goals || "Holistic wellness & nervous system balance";

    console.log(`[Lead Notification] Processing submission for: ${clientName} (${clientEmail})`);
    console.log(`Program: ${serviceName} | Location: Vadodara, Gujarat`);

    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (resendApiKey && clientEmail) {
      try {
        const resendResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Supriya Bhavsar <onboarding@resend.dev>",
            to: [clientEmail],
            subject: `Namaste ${clientName} - Your Inquiry with Supriya Bhavsar`,
            html: `
              <div style="font-family: sans-serif; background-color: #0B0914; color: #fff; padding: 30px; border-radius: 16px;">
                <h1 style="color: #C084FC;">Namaste, ${clientName}!</h1>
                <p>Thank you for submitting your application for <strong>${serviceName}</strong>.</p>
                <p>Supriya Bhavsar and her management team (@shlok.brahmbhatt) have received your details.</p>
                <div style="background: rgba(168, 85, 247, 0.15); padding: 12px; border-radius: 8px; margin: 16px 0;">
                  <em>Focus: "${goals}"</em>
                </div>
                <p style="color: #94A3B8; font-size: 12px;">Vadodara, Gujarat • Instagram: @supriya_9508</p>
              </div>
            `,
          }),
        });

        const resendData = await resendResponse.json();
        console.log("[Resend Edge Notification] Resend dispatch status:", resendData);
      } catch (emailError) {
        console.warn("[Resend Edge Notification] Resend dispatch note:", emailError);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Notification processed for ${clientName}`,
        dispatchedAt: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
