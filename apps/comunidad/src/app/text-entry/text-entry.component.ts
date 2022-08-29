import { Component, ElementRef, ViewChild } from '@angular/core';
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
  isLoading = false;
  todaysDate: string;
  @ViewChild('textarea', { static: false }) textarea!: ElementRef;

  constructor(
    private readonly supabase: SupabaseService,
    private readonly clickSend: ClickSendService
  ) {
    this.todaysDate = this.getCurrentDateDisplay();
    supabase
      .getPostByTitle(this.todaysDate)
      .then((post) => {
        if (post) {
          this.post = {
            ...post,
            body:
              window.localStorage.getItem(`textarea-${this.todaysDate}`) ||
              post.body,
          };
        }
      })
      .finally(() => {
        if (!this.post) {
          this.post = this.createDefaultPost();
        }
        setTimeout(() => {
          this.onInput(this.textarea.nativeElement);
        }, 0);
      });
  }

  get imageToDisplay() {
    return this.post.image_url || 'assets/images/default-image.png';
  }

  onInput(textarea: any) {
    textarea.parentNode.dataset.replicatedValue = textarea.value;
    window.localStorage.setItem(`textarea-${this.todaysDate}`, textarea.value);
  }

  createDefaultPost() {
    return {
      body: window.localStorage.getItem(`textarea-${this.todaysDate}`) || '',
      title: this.getCurrentDateDisplay(),
      body_permission: 50,
      image_permission: 50,
      user_id: this.supabase.user?.id,
    };
  }

  async onSaveClick() {
    this.isLoading = true;
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
    try {
      const imgUrl = await uploadFile();
      if (imgUrl) {
        const url = (await this.supabase.getFileUrl(imgUrl)) || undefined;
        this.post.image_url = url;
      }
      const result = await createPost();
      this.post.id = result?.id;
      await this.clickSend.sendEmailForPost(this.post);
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
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
