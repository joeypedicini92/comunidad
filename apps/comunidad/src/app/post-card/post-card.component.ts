import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../supabase/supabase.service';
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'comunidad-post-card',
  templateUrl: './post-card.component.html',
  providers: [MarkdownService],
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  postBody = '';
  @Input() post!: Post;

  constructor(private markdownService: MarkdownService) {}

  ngOnInit(): void {
    if (!this.post) {
      throw Error('post is required');
    }
    this.postBody = this.markdownService.parse(this.post.body);
  }
}
