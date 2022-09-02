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

  constructor(private readonly supabase: SupabaseService) {}

  async ngOnInit() {
    const data = await this.supabase.getMyJournal(this.start, this.end);

    this.posts = data || [];
  }

  async showMore() {
    this.start += this.end;
    this.end += this.rate;
    const data = await this.supabase.getMyJournal(this.start, this.end);
    if (!data || !data.length) {
      this.displayShowMoreButton = false;
    }
    this.posts.push(...(data || []));
  }
}
