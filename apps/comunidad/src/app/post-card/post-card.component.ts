import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Post, SupabaseService } from '../supabase/supabase.service';
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'comunidad-post-card',
  templateUrl: './post-card.component.html',
  providers: [MarkdownService],
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit, OnChanges {
  postBody = '';
  imageUrl = '';
  @Input() post!: Post;
  @Input() image!: string;
  @Input() body!: string;

  constructor(
    private markdownService: MarkdownService,
    private supabase: SupabaseService
  ) {}

  async ngOnInit() {
    if (!this.post) {
      throw Error('post is required');
    }
    this.postBody = this.markdownService.parse(this.post.body);
    this.postBody = this.postBody.replace(/&#226;&#8364;&#8482;/g, "'"); // cause i was dumb and imported the wrong encoded text
    if (!this.post.image_url) return;
    const res = await this.supabase.getFileUrl(
      this.post.image_url?.split('post-images/')[1] || this.post.image_url
    );
    this.imageUrl = res?.signedURL || '';
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['image']) {
      await this.ngOnInit();
    } else if (changes['body']) {
      this.postBody = this.markdownService.parse(this.post.body);
    }
  }
}
