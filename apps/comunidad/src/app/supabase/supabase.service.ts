import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthChangeEvent,
  createClient,
  PostgrestSingleResponse,
  Session,
  SupabaseClient,
  UserIdentity,
} from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { EmailBody } from '../click-send/click-send.service';

export interface Profile {
  username: string;
  email: string;
  avatar_url: string;
}

export interface Contact {
  id?: string;
  name: string;
  email: string;
  user_id?: string;
  // phone_number: string;
  created_at?: Date;
  // enabled_text_updates: boolean;
  //TODO add other columns
}

export interface Post {
  id?: string;
  title: string;
  body: string;
  created_at?: Date;
  image_url?: string;
  user_id?: string;
  body_permission?: number;
  image_permission?: number;
}

export interface PermissionLevel {
  permission_level: number;
  permission_display: string;
  permission_description: string;
}

export interface Prompt {
  id: string;
  date_to_display: string;
  prompt_text: string;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  protected supabase: SupabaseClient;

  constructor(private readonly router: Router) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  get avatarUrl() {
    const identities: UserIdentity[] = this.user?.identities || [];
    for (let i = 0; i < identities.length; i++) {
      if (identities[i].identity_data) {
        const url =
          identities[i].identity_data['avatar_url'] ||
          identities[i].identity_data['picture'];
        if (url)
          return `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=${url}`;
      }
    }

    return 'https://www.gravatar.com/avatar/00000000000000000000000000000000';
  }

  get user() {
    return this.supabase.auth.user();
  }

  get session() {
    return this.supabase.auth.session();
  }

  async profile(): Promise<PostgrestSingleResponse<any>> {
    let profile = await this.supabase
      .from('profiles')
      .select(`username, email, avatar_url`)
      .eq('id', this.user?.id)
      .single();

    if (!profile || profile.error) {
      profile = await this.updateProfile({
        email: this.user?.email || '',
        username: 'NOT SET',
        avatar_url: '',
      });
    }

    return profile;
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  signIn(email: string) {
    return this.supabase.auth.signIn({ email });
  }

  signInNotion() {
    return this.supabase.auth.signIn(
      { provider: 'notion' },
      { redirectTo: `${window.location.origin}/daily-entry` }
    );
  }

  signInGoogle() {
    return this.supabase.auth.signIn(
      { provider: 'google' },
      { redirectTo: `${window.location.origin}/daily-entry` }
    );
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      id: this.user?.id,
      updated_at: new Date(),
    };

    return this.supabase.from('profiles').upsert(update, {
      returning: 'representation', // Don't return the value after inserting
    });
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file);
  }

  getYesterdayDate() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toLocaleDateString();
  }

  getTodaysDate() {
    const date = new Date();
    date.setDate(date.getDate());
    return date.toLocaleDateString();
  }

  async getDadFeed(from = 0, to = 20) {
    const yesterday = this.getYesterdayDate();
    const today = this.getTodaysDate();
    const res = await this.supabase
      .from<Post>('posts')
      .select(`body, title, created_at`)
      // TODO this 20 is a magic number, also it should consider connections and close connections
      .gte('body_permission', 20)
      .lt('created_at', today)
      .gt('created_at', yesterday)
      .order('created_at', { ascending: false })
      .range(from, to);
    return res.body;
  }

  async getMyContacts() {
    const res = await this.supabase.from<Contact>('contacts').select();
    return res.body;
  }

  async getPublicJournal(id: string, from = 0, to = 20) {
    const res = await this.supabase
      .from<Post>('posts')
      .select()
      .eq('user_id', id)
      .gte('body_permission', 50)
      .order('created_at', { ascending: false })
      .range(from, to);
    return res.body;
  }

  async prepEmail(body: EmailBody) {
    const res = await this.supabase
      .from('emails')
      .upsert({ email_data: body, post_id: body.postId, sent: false })
      .single();
  }

  async getMyJournal(from = 0, to = 20) {
    const res = await this.supabase
      .from<Post>('posts')
      .select()
      .eq('user_id', this.user?.id)
      .order('created_at', { ascending: false })
      .range(from, to);
    return res.body;
  }

  async createPost(post: Post) {
    const res = await this.supabase.from<Post>('posts').insert(post).single();
    return res.body;
  }

  async updatePost(post: Post) {
    const res = await this.supabase.from<Post>('posts').update(post).single();
    return res.body;
  }

  async getPostByTitle(title: string) {
    const res = await this.supabase
      .from<Post>('posts')
      .select()
      .eq('title', title)
      .eq('user_id', this.user?.id)
      .maybeSingle();
    return res.body;
  }

  async uploadFileForPost(post: Post, file: File) {
    const fileName = `${this.user?.id}/${post.title}.${file.name
      .split('.')
      .pop()}`;
    await this.supabase.storage.from('post-images').upload(fileName, file);
    return fileName;
  }

  async getFileUrl(path: string) {
    const { publicURL, error } = await this.supabase.storage
      .from('post-images')
      .getPublicUrl(path);

    return publicURL;
  }

  async addContact(contact: Contact) {
    const res = await this.supabase
      .from<Contact>('contacts')
      .insert(contact)
      .single();
    return res.body;
  }

  async getPostPermissionLevels() {
    const res = await this.supabase
      .from<PermissionLevel>('permission_levels')
      .select()
      .order('permission_level', { ascending: true });
    return res.body;
  }

  async getTodaysPrompt() {
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();

    const res = await this.supabase
      .from<Prompt>('writing_prompts')
      .select()
      .eq('date_to_display', `2022-${currentMonth}-${currentDay}`)
      .single();

    return res.body;
  }
}
