Cron job to send emails for posts
```
select
  cron.schedule(
    'webhook-every-minute', -- name of the cron job
    '0 0 * * *', -- every minute
    $$
    select status
      FROM http((
          'POST',
           'https://lqdaxluelkkszzlmpvrh.functions.supabase.co/hello-world',
           ARRAY[http_header('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZGF4bHVlbGtrc3p6bG1wdnJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTkzNjE0MzEsImV4cCI6MTk3NDkzNzQzMX0.IFDaFCvycRNRDNHMSQNaAK8oLtZwl_m0-rF06iqvXR8')],
           'application/json',
           '{"hello": "world"}'
        )::http_request)
    $$
  );
```
