import { Injectable } from '@angular/core';
import axios from 'axios';
import { Post, Contact, SupabaseService } from '../supabase/supabase.service';
import { environment } from '../../environments/environment';

export interface EmailBody {
  subject: string;
  body: string;
  postId: string;
  imageUrl: string;
  to: Contact[];
}

// TODO put this in an environment file
const SEND_EMAIL_URL =
  'https://lqdaxluelkkszzlmpvrh.functions.supabase.co/send-post-email';

@Injectable({
  providedIn: 'root',
})
export class ClickSendService {
  constructor(private supabase: SupabaseService) {}
  async sendEmailForPost(post: Post, contacts: Contact[]) {
    const body: EmailBody = {
      subject: post.title,
      body: post.body,
      postId: post.id || '',
      imageUrl: post.image_url || '',
      to: contacts?.map((con) => {
        return { email: con.email, name: con.name };
      }),
    };
    const result = await axios.post(SEND_EMAIL_URL, body, {
      headers: {
        Authorization: 'Bearer ' + this.supabase.session?.access_token,
      },
    });
    console.log(result);
  }
}
