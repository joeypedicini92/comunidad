import { Injectable } from '@angular/core';
import {AuthChangeEvent, createClient, Session, SupabaseClient} from '@supabase/supabase-js';
import {environment} from "../../environments/environment";

export interface Profile {
  username: string;
  email: string;
  avatar_url: string;
}

export interface Contact {
  id: string;
  name: string;
  phone_number: string;
  created_at: Date;
  enabled_text_updates: boolean;
//TODO add other columns
}

export interface Post {
  id: string;
  title: string;
  body: string;
  created_at: Date;
  image_url?: string;
  user_id?: string;
  body_permission: number;
  image_permission: number;
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  protected supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
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

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  signIn(email: string) {
    return this.supabase.auth.signIn({email});
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      id: this.user?.id,
      updated_at: new Date()
    }

    return this.supabase.from('profiles').upsert(update, {
      returning: 'minimal', // Don't return the value after inserting
    });
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage
      .from('avatars')
      .upload(filePath, file);
  }


  async getDadFeed() {
    // TODO this 40 is a magic number, also it should consider connections and close connections
    const res = await this.supabase.from<Post>('posts').select().gte('body_permission', 40).order('created_at', {ascending: false});
    return res.body;
  }

  async getMyContacts() {
    const res = await this.supabase.from<Contact>('contacts').select();
    return res.body;
  }


  async getMyJournal() {
    const res = await this.supabase.from<Post>('posts').select().eq('user_id', this.user?.id).order('created_at', {ascending: false});
    return res.body;
  }
}
