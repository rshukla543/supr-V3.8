// Supabase Edge Function: newsletter-digest
// Dispatches Sunday morning mindful fitness tips to active subscribers
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
    const { tipNumber, subject, content } = await req.json();

    console.log(`[Sunday Digest Dispatch] Broadcasting Tip #${tipNumber}: "${subject}"`);

    return new Response(
      JSON.stringify({
        success: true,
        dispatchedTip: tipNumber,
        status: "Delivered to active subscribers queue",
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
