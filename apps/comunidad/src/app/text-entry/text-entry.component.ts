import { Component } from '@angular/core';
import { Post, SupabaseService } from '../supabase/supabase.service';
import { ClickSendService } from '../click-send/click-send.service';

@Component({
  selector: 'comunidad-text-entry',
  templateUrl: './text-entry.component.html',
  styleUrls: ['./text-entry.component.scss'],
})
export class TextEntryComponent {
  post!: Post;
  file?: any;
  uploadFile?: string;

  constructor(
    private readonly supabase: SupabaseService,
    private readonly clickSend: ClickSendService
  ) {
    const todaysDate = this.getCurrentDateDisplay();
    supabase
      .getPostByTitle(todaysDate)
      .then((post) => {
        if (post) {
          this.post = post;
        }
      })
      .finally(() => {
        if (!this.post) {
          this.post = this.createDefaultPost();
        }
      });
  }

  get imageToDisplay() {
    return this.post.image_url || 'assets/images/default-image.png';
  }

  createDefaultPost() {
    return {
      body: '',
      title: this.getCurrentDateDisplay(),
      body_permission: 50,
      image_permission: 50,
      user_id: this.supabase.user?.id,
    };
  }

  async onSaveClick() {
    const uploadFile = async () => {
      if (this.file) {
        return this.supabase.uploadFileForPost(this.post, this.file);
      } else {
        return Promise.resolve();
      }
    };
    const createPost = () => {
      if (this.post.id) {
        return this.supabase.updatePost(this.post);
      } else {
        return this.supabase.createPost(this.post);
      }
    };

    // IMPLEMENTATION

    const imgUrl = await uploadFile();
    if (imgUrl) {
      const url = (await this.supabase.getFileUrl(imgUrl)) || undefined;
      this.post.image_url = url;
    }
    await createPost();
    await this.clickSend.sendEmailForPost(this.post);
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      document
        .getElementById('uploadedImg')
        ?.setAttribute('src', URL.createObjectURL(file));
      this.file = file;
    }
  }

  getCurrentDateDisplay() {
    const date = new Date();
    return date.toDateString();
  }
}
