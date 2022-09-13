// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from 'https://deno.land/std@0.131.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@^1.33.2';

const supabaseClient = createClient(
  // Supabase API URL - env var exported by default when deployed.
  Deno.env.get('SUPABASE_URL') ?? '',
  // Supabase API ANON KEY - env var exported by default when deployed.
  Deno.env.get('SUPABASE_ANON_KEY') ?? ''
);

console.log('Hello from bulk-email-send!');

// TODO clean this up move CORS stuff to a separate file
serve(async (req) => {
  console.log('request being handled');

  const unsentEmails = await supabaseClient
    .from('emails')
    .select('*')
    .eq('sent', false);

  for (const email of unsentEmails.data || []) {
    const body = Object.assign(
      { postId: email.post_id, immediate: true },
      email.email_data
    );
    const result = await fetch(
      `
      https://lqdaxluelkkszzlmpvrh.functions.supabase.co/send-post-email`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
        },
        body: JSON.stringify(body),
      }
    );
    console.log(result);
  }

  return new Response('ok');
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
