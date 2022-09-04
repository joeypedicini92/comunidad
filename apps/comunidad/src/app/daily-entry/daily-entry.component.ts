import { Component } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import { ClickSendService } from '../click-send/click-send.service';
import { CreatePostComponent } from '../create-post/create-post.component';

@Component({
  selector: 'comunidad-daily-entry',
  templateUrl: './daily-entry.component.html',
  styleUrls: ['./daily-entry.component.scss'],
})
export class DailyEntryComponent extends CreatePostComponent {
  todaysDate: string;

  constructor(supabase: SupabaseService, clickSend: ClickSendService) {
    super(supabase, clickSend);
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
      });
    setTimeout(() => {
      this.post = this.createDefaultPost();
      this.post.body = '';
    }, this.waitForMidnight());
  }

  waitForMidnight() {
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

  override createDefaultPost() {
    return {
      body: window.localStorage.getItem(`textarea-${this.todaysDate}`) || '',
      title: this.getCurrentDateDisplay(),
      user_id: this.supabase.user?.id,
    };
  }

  getCurrentDateDisplay() {
    const date = new Date();
    return date.toDateString();
  }
}
