import { Component } from '@angular/core';
import {
  PermissionLevel,
  Post,
  SupabaseService,
} from '../supabase/supabase.service';
import { ClickSendService } from '../click-send/click-send.service';
import { CreatePostComponent } from '../create-post/create-post.component';
import { isEqual } from 'lodash';

@Component({
  selector: 'comunidad-daily-entry',
  templateUrl: './daily-entry.component.html',
  styleUrls: ['./daily-entry.component.scss'],
})
export class DailyEntryComponent extends CreatePostComponent {
  todaysDate: string;
  lastSaved = '';
  previousPost?: Post;

  constructor(supabase: SupabaseService, clickSend: ClickSendService) {
    super(supabase, clickSend);
    this.todaysDate = this.getCurrentDateDisplay();
    supabase
      .getPostByTitle(this.todaysDate)
      .then((post) => {
        if (post) {
          this.post = {
            ...post,
            body: post.body,
          };
        }
      })
      .finally(() => {
        if (!this.post) {
          this.post = this.createDefaultPost();
        }
        setTimeout(() => {
          location.reload();
        }, this.midnight());

        setInterval(() => {
          if (!isEqual(this.post, this.previousPost)) {
            this.previousPost = Object.assign({}, this.post);
            this.savePost();
          }
        }, 5000);
      });
  }

  midnight() {
    const now = new Date();
    const midnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0
    );
    return midnight.getTime() - now.getTime();
  }

  async savePost() {
    this.isLoading = true;
    if (!this.post.body) return;
    try {
      const result = await this.createPost();
      this.post.id = result?.id;
      if (this.post.body_permission && this.post.body_permission >= 10) {
        // await this.clickSend.sendEmailForPost(
        //   this.post,
        //   this.selectedContacts.items,
        //   false
        // );
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
      this.lastSaved = new Date().toLocaleTimeString();
    }
  }

  override createDefaultPost() {
    return {
      body: window.localStorage.getItem(`textarea-${this.todaysDate}`) || '',
      title: this.getCurrentDateDisplay(),
      body_permission: parseInt(
        window.localStorage.getItem(`generic-post-permission`) || ''
      ),
      user_id: this.supabase.user?.id,
    };
  }

  override saveToLocalStorage() {
    window.localStorage.setItem(`textarea-${this.todaysDate}`, this.post.body);
    window.localStorage.setItem(
      `post-${this.todaysDate}`,
      JSON.stringify(this.post)
    );
  }

  override onChangePermissionLevel(permission: PermissionLevel) {
    this.post.body_permission = permission.permission_level;
    this.post.image_permission = permission.permission_level;
  }

  getCurrentDateDisplay() {
    const date = new Date();
    return date.toDateString();
  }
}
