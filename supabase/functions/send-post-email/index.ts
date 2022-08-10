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

const EMAIL_URL = 'rest.clicksend.com/v3/email/send';
const EMAIL_ID = 22752;
const EMAIL_NAME = 'Supabase';
const EMAIL_PASSWORD = 'D59DCC6B-1CC2-A5C9-EA16-73119FEE3744';
const EMAIL_USERID = 'joey.pedicini@gmail.com';

console.log('Hello from send-post-email!');

serve(async (req) => {
  const { subject, body, to, postId } = await req.json();

  const clickSendBody = {
    to: [
      {
        email: 'joey.pedicini@gmail.com',
        name: 'Joey Pedicini',
      },
    ],
    from: {
      email_address_id: EMAIL_ID,
      name: EMAIL_NAME,
    },
    subject: subject,
    body: body,
  };

  const result = await fetch(
    `https://${EMAIL_USERID}:${EMAIL_PASSWORD}@${EMAIL_URL}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clickSendBody),
    }
  );

  supabaseClient.auth.setAuth(
    req.headers.get('Authorization')!.replace('Bearer ', '')
  );

  await supabaseClient
    .from('emails')
    .insert({ email_data: clickSendBody, post_id: postId })
    .single();

  console.log(result);

  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' },
  });
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
