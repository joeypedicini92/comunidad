import { Component, OnInit } from '@angular/core';
import { SupabaseService, Post } from '../supabase/supabase.service';

@Component({
  selector: 'comunidad-my-journal',
  templateUrl: './my-journal.component.html',
  styleUrls: ['./my-journal.component.scss'],
})
export class MyJournalComponent implements OnInit {
  constructor(private readonly supabase: SupabaseService) {}
  posts: Post[] = [];
  async ngOnInit() {
    const data = await this.supabase.getMyJournal();

    this.posts = data || [];
  }
}
