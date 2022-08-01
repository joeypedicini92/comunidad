import { Component } from '@angular/core';
import {SupabaseService} from "../supabase/supabase.service";

@Component({
  selector: 'comunidad-site-navigation',
  templateUrl: './site-navigation.component.html',
  styleUrls: ['./site-navigation.component.scss'],
})
export class SiteNavigationComponent  {
  menuOpen = false;
  constructor(private readonly supabase: SupabaseService) {}
  signOut() {
    this.supabase.signOut();
  }
}
