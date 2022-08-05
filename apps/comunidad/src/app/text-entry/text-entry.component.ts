import { Component } from '@angular/core';
import { Post, SupabaseService } from '../supabase/supabase.service';

@Component({
  selector: 'comunidad-text-entry',
  templateUrl: './text-entry.component.html',
  styleUrls: ['./text-entry.component.scss'],
})
export class TextEntryComponent  {
  post!: Post;
  file?: File;

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

  async onSaveClick() {
    const uploadFile = async () => {
      if (this.file) {
        return this.supabase.uploadFileForPost(this.post, this.file)
      } else {
        return Promise.resolve();
      }
    }
    const createPost = () => {
      if (this.post.id) {
        this.supabase.updatePost(this.post);
      } else {
        this.supabase.createPost(this.post);
      }
    }

    const imgUrl = await uploadFile();
    if(imgUrl) {
      const url = await this.supabase.getFileUrl(imgUrl) || undefined;
      this.post.image_url = url;
    }
    createPost();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.file = file;
  }

  getCurrentDateDisplay() {
    const date = new Date();
    return date.toDateString();
  }
}
