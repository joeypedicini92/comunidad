import { Component, OnInit } from '@angular/core';
import { SiteNavigationService } from '../site-navigation/site-navigation.service';
import { SupabaseService } from '../supabase/supabase.service';

@Component({
  selector: 'comunidad-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  session = this.supabase.session;
  title = 'comunidad';

  constructor(
    private readonly siteNav: SiteNavigationService,
    private readonly supabase: SupabaseService
  ) {}

  ngOnInit() {
    this.supabase.authChanges((_, session) => (this.session = session));
  }

  get currentPage() {
    return this.siteNav.currentPage.name;
  }
}
