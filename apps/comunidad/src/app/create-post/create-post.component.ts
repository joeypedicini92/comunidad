import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClickSendService } from '../click-send/click-send.service';
import { PillListComponent } from '../pill-list/pill-list.component';
import { Contact, Post, SupabaseService } from '../supabase/supabase.service';

@Component({
  selector: 'comunidad-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
  contacts: Contact[] = [];
  post!: Post;
  file?: any;
  uploadFile?: string;
  isLoading = false;
  @ViewChild('textarea', { static: false }) textarea!: ElementRef;
  @ViewChild('selectedContacts', { static: false })
  selectedContacts!: PillListComponent;

  constructor(
    readonly supabase: SupabaseService,
    readonly clickSend: ClickSendService
  ) {
    this.post = this.createDefaultPost();
    supabase.getMyContacts().then((contacts) => {
      this.contacts = contacts || [];
    });
  }

  get imageToDisplay() {
    return this.post.image_url || 'assets/images/default-image.png';
  }

  createDefaultPost() {
    return {
      body: window.localStorage.getItem(`generic-post-body`) || '',
      title: window.localStorage.getItem(`generic-post-title`) || '',
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
      await this.clickSend.sendEmailForPost(
        this.post,
        this.selectedContacts.items
      );
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
}
