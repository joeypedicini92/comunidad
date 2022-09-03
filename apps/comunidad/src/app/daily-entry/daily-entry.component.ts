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
  }

  getCurrentDateDisplay() {
    const date = new Date();
    return date.toDateString();
  }
}
