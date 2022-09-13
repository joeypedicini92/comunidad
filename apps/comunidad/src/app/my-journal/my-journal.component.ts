import { Component, OnInit } from '@angular/core';
import { SupabaseService, Post } from '../supabase/supabase.service';

@Component({
  selector: 'comunidad-my-journal',
  templateUrl: './my-journal.component.html',
  styleUrls: ['./my-journal.component.scss'],
})
export class MyJournalComponent implements OnInit {
  start = 0;
  end = 5;
  rate = 5;
  displayShowMoreButton = true;
  posts: Post[] = [];

  range = 0;
  postDates: string[] = [];

  get max() {
    return this.postDates.length;
  }

  constructor(private readonly supabase: SupabaseService) {}

  async ngOnInit() {
    const data = await this.supabase.getMyJournal(this.start, this.end);

    this.posts = data || [];

    const rows = await this.supabase.getPostDatesForUser();
    this.postDates =
      rows?.map((b) => new Date(b.created_at as any).toLocaleDateString()) ||
      [];
  }

  async onRangeChange() {
    this.start = this.range;
    this.end = this.start + this.rate;
    const data = await this.supabase.getMyJournal(this.start, this.end);
    this.posts = data || [];
  }

  async showMore() {
    this.start = this.end + 1;
    this.end += this.rate;
    const data = await this.supabase.getMyJournal(this.start, this.end);
    if (!data || !data.length) {
      this.displayShowMoreButton = false;
    }
    this.posts.push(...(data || []));
  }
}
