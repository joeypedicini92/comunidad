import { Injectable } from '@angular/core';
import {AuthChangeEvent, createClient, Session, SupabaseClient} from '@supabase/supabase-js';
import {environment} from "../../environments/environment";

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
  body_permission: number;
  image_permission: number;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  protected supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  get user() {
    return this.supabase.auth.user();
  }

  get session() {
    return this.supabase.auth.session();
  }

  get profile() {
    return this.supabase
      .from('profiles')
      .select(`username, email, avatar_url`)
      .eq('id', this.user?.id)
      .single();
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  signIn(email: string) {
    return this.supabase.auth.signIn({ email });
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
      returning: 'minimal', // Don't return the value after inserting
    });
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file);
  }

  async getDadFeed(from = 0, to = 20) {
    // TODO this 40 is a magic number, also it should consider connections and close connections
    const res = await this.supabase
      .from<Post>('posts')
      .select()
      .gte('body_permission', 40)
      .order('created_at', { ascending: false })
      .range(from, to);
    return res.body;
  }

  async getMyContacts() {
    const res = await this.supabase.from<Contact>('contacts').select();
    return res.body;
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
    const fileName = `${this.user?.id}/${Date.now()}.${file.name
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
}
