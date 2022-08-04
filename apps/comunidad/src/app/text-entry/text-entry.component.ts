import { Component } from '@angular/core';
import { Post, SupabaseService } from '../supabase/supabase.service';

@Component({
  selector: 'comunidad-text-entry',
  templateUrl: './text-entry.component.html',
  styleUrls: ['./text-entry.component.scss'],
})
export class TextEntryComponent  {
  post!: Post;

  constructor(private readonly supabase: SupabaseService) {
    const todaysDate = this.getCurrentDateDisplay();
    supabase.getPostByTitle(todaysDate).then(post => {
      if (post) {
        this.post = post;
      }
    }).finally(() => {
      if (!this.post) {
        this.post = this.createDefaultPost();
      }
    });

  }

  createDefaultPost() {
     return {
      body: '',
      title: this.getCurrentDateDisplay(),
      body_permission: 50,
      image_permission: 50,
      user_id: this.supabase.user?.id,
    }
  }

  onCreateClick() {
    if (this.post.id) {
      this.supabase.updatePost(this.post);
    } else {
      this.supabase.createPost(this.post);
    }
  }

  getCurrentDateDisplay() {
    const date = new Date();
    return date.toDateString();
  }
}
