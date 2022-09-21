/**
 * So I can't seem to get an image generated from the iframe.
 * Will need to load the iframe url, and then scrape the images from the page
 */

const jsdom = require('jsdom');
const fs = require('fs');
var { takeImage } = require('jsdom-to-image');
const { JSDOM } = jsdom;
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://lqdaxluelkkszzlmpvrh.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZGF4bHVlbGtrc3p6bG1wdnJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTkzNjE0MzEsImV4cCI6MTk3NDkzNzQzMX0.IFDaFCvycRNRDNHMSQNaAK8oLtZwl_m0-rF06iqvXR8'
);

async function createPost(post) {
  return await supabase.from('posts').insert(post).single();
}

JSDOM.fromFile('tumblr.html', { runScripts: 'outside-only' }).then(
  async (dom) => {
    const document = dom.window.document;

    const posts = document.querySelectorAll('article');
    for (let i = 0; i < posts.length; i++) {
      console.log('Processing post', i + 1, 'of', posts.length);
      const postRequest = {};
      const post = posts[i];
      const date = post.querySelector('time').getAttribute('datetime');
      const dateString = new Date(date).toDateString();
      const created_at = new Date(date).toISOString();
      postRequest.title = dateString;
      postRequest.created_at = created_at;
      postRequest.user_id = '824514e2-5960-4e2c-8b60-2f54bf3a4d86';
      const content =
        post.querySelector('.body-text')?.textContent ||
        post.querySelector('.caption')?.textContent;
      postRequest.body = content;
      postRequest.body_permission = 50;
      const img = post.querySelector('iframe.photoset');
      if (img) {
        console.log('Found image', img);
        dom.window.eval(
          `var { takeImage } = require('jsdom-to-image');takeImage({ targetSelector: 'iframe.photoset' })`
        );
        // const blob = await ;
        console.log(blob);
        fs.writeFileSync(
          `C:/Users/Joey/Code/comunidad/images/tumblr-image-${i}.png`,
          blob
        );
        postRequest.image_url = `824514e2-5960-4e2c-8b60-2f54bf3a4d86/tumblr-image-${i}.png`;
      }

      console.log(
        postRequest,
        '\n\n**************************************\n\n'
      );
      // const res = await createPost(postRequest);
      // console.log(res.status);
    }
  }
);
