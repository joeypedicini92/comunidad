import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClickSendService } from '../click-send/click-send.service';
import { PillListComponent } from '../pill-list/pill-list.component';
import {
  Contact,
  PermissionLevel,
  Post,
  SupabaseService,
} from '../supabase/supabase.service';

@Component({
  selector: 'comunidad-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
  contacts: Contact[] = [];
  post!: Post;
  file?: any;

  isLoading = false;
  @ViewChild('textarea', { static: false }) textarea!: ElementRef;
  @ViewChild('selectedContacts', { static: false })
  selectedContacts!: PillListComponent;
  writingPrompt = 'Your message...';

  constructor(
    readonly supabase: SupabaseService,
    readonly clickSend: ClickSendService
  ) {
    this.post = this.createDefaultPost();
    supabase.getMyContacts().then((contacts) => {
      this.contacts = contacts || [];
    });
    supabase.getTodaysPrompt().then((prompt) => {
      this.writingPrompt = prompt?.prompt_text || 'Your message...';
    });
  }

  get imageToDisplay() {
    return this.post.image_url || 'assets/images/default-image.png';
  }

  createDefaultPost() {
    return {
      body: window.localStorage.getItem(`generic-post-body`) || '',
      title: window.localStorage.getItem(`generic-post-title`) || '',
      body_permission: parseInt(
        window.localStorage.getItem(`generic-post-permission`) || ''
      ),
      user_id: this.supabase.user?.id,
    };
  }

  async uploadFile() {
    if (this.file) {
      return this.supabase.uploadFileForPost(this.post, this.file);
    } else {
      return Promise.resolve();
    }
  }
  createPost() {
    if (this.post.id) {
      return this.supabase.updatePost(this.post);
    } else {
      return this.supabase.createPost(this.post);
    }
  }

  async onSaveClick() {
    this.isLoading = true;

    try {
      const result = await this.createPost();
      this.post.id = result?.id;
      if (this.post.body_permission && this.post.body_permission >= 10) {
        await this.clickSend.sendEmailForPost(
          this.post,
          this.selectedContacts.items
        );
      }
      this.post = {
        ...this.post,
        body: '',
        image_url: '',
        title: '',
      };
      alert('Post saved!');
    } catch (e) {
      console.log(e);
      alert('Error saving post');
    } finally {
      this.isLoading = false;
    }
  }

  isPostEnabled() {
    return (
      this.post.body &&
      this.post.title &&
      this.post.body_permission !== undefined
    );
  }

  async onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    document
      .getElementById('uploadedImg')
      ?.setAttribute('src', URL.createObjectURL(file));
    this.file = file;

    const imgUrl = await this.uploadFile();
    if (imgUrl) {
      const url = (await this.supabase.getFileUrl(imgUrl)) || undefined;
      this.post.image_url = url;
    }
  }

  saveToLocalStorage() {
    window.localStorage.setItem(`generic-post-body`, this.post.body);
    window.localStorage.setItem(`generic-post-title`, this.post.title);
  }

  onChangePermissionLevel(permission: PermissionLevel) {
    this.post.body_permission = permission.permission_level;
    this.post.image_permission = permission.permission_level;
    window.localStorage.setItem(
      `generic-post-permission`,
      this.post.body_permission?.toString() || ''
    );
  }
}
