import { Component, OnInit } from '@angular/core';
import { SupabaseService } from './supabase/supabase.service';

@Component({
  selector: 'comunidad-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  session = this.supabase.session;
  pwaSeen = false;

  constructor(private readonly supabase: SupabaseService) {
    if (window.localStorage.getItem('pwa-install')) {
      this.pwaSeen = true;
    }
  }

  ngOnInit() {
    this.supabase.authChanges((_, session) => (this.session = session));
  }
}
