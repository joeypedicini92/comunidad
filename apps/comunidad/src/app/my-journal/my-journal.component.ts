import { Component, OnInit } from '@angular/core';
import { GetMyJournalQueries, Post } from '../supabase/queries/get-my-journal';

@Component({
  selector: 'comunidad-my-journal',
  templateUrl: './my-journal.component.html',
  styleUrls: ['./my-journal.component.scss'],
})
export class MyJournalComponent implements OnInit {
  constructor(private readonly getMyJournal: GetMyJournalQueries) {}
  posts: Post[] = [];
  async ngOnInit() {
    const data = await this.getMyJournal.getMyJournal();

    this.posts = data || [];
  }
}
