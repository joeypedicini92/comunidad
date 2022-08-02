import { Injectable } from "@angular/core";
import { SupabaseService } from "../supabase.service";
import { Post } from "./get-my-journal";

@Injectable({
  providedIn: 'root'
})
export class GetDadFeedQueries extends SupabaseService {
  async getDadFeed() {
    const res = await this.supabase.from<Post>('posts').select().gte('body_permission', 40).order('created_at', {ascending: false});
    return res.body;
  }
}
