import { Component, OnInit } from '@angular/core';
import { GetDadFeedQueries } from '../supabase/queries/get-dad-feed';
import { Post } from '../supabase/queries/get-my-journal';

@Component({
  selector: 'comunidad-dad-feed',
  templateUrl: './dad-feed.component.html',
  styleUrls: ['./dad-feed.component.scss'],
})
export class DadFeedComponent implements OnInit {
  constructor(private readonly getDadFeed: GetDadFeedQueries) {}
  posts: Post[] = [];
  async ngOnInit() {
    const data = await this.getDadFeed.getDadFeed();

    this.posts = data || [];
  }
}
