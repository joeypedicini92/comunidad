import { createClient } from '@supabase/supabase-js';

const environment = {
  supabaseUrl: 'https://lqdaxluelkkszzlmpvrh.supabase.co',
  supabaseKey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZGF4bHVlbGtrc3p6bG1wdnJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTkzNjE0MzEsImV4cCI6MTk3NDkzNzQzMX0.IFDaFCvycRNRDNHMSQNaAK8oLtZwl_m0-rF06iqvXR8',
};

const supabaseUrl = environment.supabaseUrl;
const supabaseAnonKey = environment.supabaseKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
