import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post, SupabaseService } from '../supabase/supabase.service';

@Component({
  selector: 'comunidad-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss'],
})
export class PublicProfileComponent implements OnInit {
  start = 0;
  end = 5;
  rate = 5;
  displayShowMoreButton = true;
  id!: string | null;

  posts: Post[] = [];

  constructor(
    private route: ActivatedRoute,
    private readonly supabase: SupabaseService
  ) {}

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      const data = await this.supabase.getPublicJournal(
        this.id,
        this.start,
        this.end
      );

      this.posts = data || [];
    }
  }

  async showMore() {
    if (!this.id) return;

    this.start += this.end;
    this.end += this.rate;

    const data = await this.supabase.getPublicJournal(
      this.id,
      this.start,
      this.end
    );
    if (!data || !data.length) {
      this.displayShowMoreButton = false;
    }
    this.posts.push(...(data || []));
  }
}
