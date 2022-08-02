import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../supabase/queries/get-my-journal';

@Component({
  selector: 'comunidad-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  @Input() post!: Post;

  ngOnInit(): void {
    if (!this.post) {
      throw Error('post is required');
    }
  }
}
