import { Component, OnInit } from '@angular/core';
import {SupabaseService} from "./supabase/supabase.service";

@Component({
  selector: 'comunidad-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  session = this.supabase.session;

  constructor(private readonly supabase: SupabaseService) { }

  ngOnInit() {
    this.supabase.authChanges((_, session) => this.session = session);
  }
}
