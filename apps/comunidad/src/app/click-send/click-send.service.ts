import { Injectable } from '@angular/core';
import axios from 'axios';
import { Post, SupabaseService } from '../supabase/supabase.service';
import { environment } from '../../environments/environment';

// TODO put this in an environment file
const SEND_EMAIL_URL =
  'https://lqdaxluelkkszzlmpvrh.functions.supabase.co/send-post-email';

@Injectable({
  providedIn: 'root',
})
export class ClickSendService {
  constructor(private supabase: SupabaseService) {}
  async sendEmailForPost(post: Post) {
    const contacts = await this.supabase.getMyContacts();
    const result = await axios.post(
      SEND_EMAIL_URL,
      {
        subject: post.title,
        body: post.body,
        postId: post.id,
        imageUrl: post.image_url,
        to: contacts?.map((con) => {
          return { email: con.email, name: con.name };
        }),
      },
      { headers: { Authorization: 'Bearer ' + environment.supabaseKey } }
    );
    console.log(result);
  }
}
