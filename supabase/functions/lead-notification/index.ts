// Supabase Edge Function: lead-notification
// Triggered on new waitlist or brand partnership inquiry
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

    console.log(`[Lead Notification] New intake received for: ${record.service_id}`);
    console.log(`Client: ${record.full_name} (${record.email})`);
    console.log(`Goals: ${record.goals || "N/A"}`);

    // In production, integrate with transactional provider (e.g. Resend / SendGrid)
    // to notify management@supriyawellness.com and send confirmation sequence to client.

    return new Response(
      JSON.stringify({
        success: true,
        message: `Notification queued for ${record.full_name}`,
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
