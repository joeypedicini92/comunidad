import { Injectable } from "@angular/core";
import { SupabaseService } from "../supabase.service";

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
export class GetMyJournalQueries extends SupabaseService {
  async getMyJournal() {
    const res = await this.supabase.from<Post>('posts').select().eq('user_id', this.user?.id).order('created_at', {ascending: false});
    return res.body;
  }
}
