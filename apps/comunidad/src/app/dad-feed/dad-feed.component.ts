import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import { Post } from '../supabase/supabase.service';

@Component({
  selector: 'comunidad-dad-feed',
  templateUrl: './dad-feed.component.html',
  styleUrls: ['./dad-feed.component.scss'],
})
export class DadFeedComponent implements OnInit {
  start = 0;
  end = 5;
  rate = 5;
  displayShowMoreButton = true;

  constructor(private readonly supabase: SupabaseService) {}
  posts: Post[] = [];
  async ngOnInit() {
    const data = await this.supabase.getDadFeed(this.start, this.end);

    this.posts = data || [];
  }

  async showMore() {
    this.start += this.end;
    this.end += this.rate;
    const data = await this.supabase.getDadFeed(this.start, this.end);
    if (!data || !data.length) {
      this.displayShowMoreButton = false;
    }
    this.posts.push(...(data || []));
  }
}
