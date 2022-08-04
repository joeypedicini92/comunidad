import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import { Post } from '../supabase/supabase.service';

@Component({
  selector: 'comunidad-dad-feed',
  templateUrl: './dad-feed.component.html',
  styleUrls: ['./dad-feed.component.scss'],
})
export class DadFeedComponent implements OnInit {
  constructor(private readonly supabase: SupabaseService) {}
  posts: Post[] = [];
  async ngOnInit() {
    const data = await this.supabase.getDadFeed();

    this.posts = data || [];
  }
}
