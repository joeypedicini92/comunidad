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
  userName = '';
  posts: Post[] = [];

  constructor(
    private route: ActivatedRoute,
    private readonly supabase: SupabaseService
  ) {}

  async getUserDetails() {
    const { data: profile, error, status } = await this.supabase.profile();
    this.userName = profile.username;
  }

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
    await this.getUserDetails();
  }

  async showMore() {
    if (!this.id) return;

    this.start += this.end + 1;
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
