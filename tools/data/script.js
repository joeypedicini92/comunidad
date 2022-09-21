const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://lqdaxluelkkszzlmpvrh.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZGF4bHVlbGtrc3p6bG1wdnJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTkzNjE0MzEsImV4cCI6MTk3NDkzNzQzMX0.IFDaFCvycRNRDNHMSQNaAK8oLtZwl_m0-rF06iqvXR8'
);

const download = require('image-downloader');

async function downloadImage(url, filepath) {
  return await download.image({
    url,
    dest: filepath,
  });
}

async function createPost(post) {
  return await supabase.from('posts').insert(post).single();
}

JSDOM.fromFile('wordpress.html', {}).then(async (dom) => {
  const document = dom.window.document;

  const posts = document.querySelectorAll('.post.type-post');
  for (let i = 0; i < posts.length; i++) {
    const postRequest = {};
    const post = posts[i];
    const title = post.querySelector('.entry-title').textContent;
    const date = post.querySelector('.entry-date').textContent;
    const dateString = new Date(date).toDateString();
    const created_at = new Date(date).toISOString();
    postRequest.title = `${title} - ${dateString}`;
    postRequest.created_at = created_at;
    postRequest.user_id = '824514e2-5960-4e2c-8b60-2f54bf3a4d86';
    const content = post.querySelector('.entry-content').textContent;
    postRequest.body = content;
    postRequest.body_permission = 50;
    const img = post.querySelectorAll('[href*=jpg]');
    if (img.length > 0) {
      const url = img[0].href;
      const filepath = url.split('/').pop();
      postRequest.image_url = `824514e2-5960-4e2c-8b60-2f54bf3a4d86/${filepath}`;
    }
    // console.log(postRequest, '\n\n**************************************\n\n');
    const res = await createPost(postRequest);
    console.log(res.status);
  }
});
