import {
  AuthChangeEvent,
  createClient,
  PostgrestSingleResponse,
  Session,
  SupabaseClient,
  UserIdentity,
} from '@supabase/supabase-js';

const environment = {
  supabaseUrl: 'https://lqdaxluelkkszzlmpvrh.supabase.co',
  supabaseKey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZGF4bHVlbGtrc3p6bG1wdnJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTkzNjE0MzEsImV4cCI6MTk3NDkzNzQzMX0.IFDaFCvycRNRDNHMSQNaAK8oLtZwl_m0-rF06iqvXR8',
};

const supabase = createClient(
  environment.supabaseUrl,
  environment.supabaseKey
);

export default async function handler(req, res) {
  // Get data submitted in request's body.
  const body = req.body

  // Optional logging to see the responses
  // in the command line where next.js app is running.
  console.log('body: ', body)

  // Guard clause checks for first and last name,
  // and returns early if they are not found
  if (!body.email) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: 'email not valid' })
  }

  const response = await supabase.auth.signIn({ email: body.email });

  // Found the name.
  // Sends a HTTP success code
  res.status(200).json({ data: `${body.email}`, response })
}
