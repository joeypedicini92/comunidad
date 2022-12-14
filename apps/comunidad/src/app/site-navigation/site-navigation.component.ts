import { AfterViewInit, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {SupabaseService} from "../supabase/supabase.service";
import { appPages, Page, personalPages, SiteNavigationService } from './site-navigation.service';

@Component({
  selector: 'comunidad-site-navigation',
  templateUrl: './site-navigation.component.html',
  styleUrls: ['./site-navigation.component.scss'],
})
export class SiteNavigationComponent implements AfterViewInit {
  userMenuOpen = false;
  mainMenuOpen = false;
  appPages = appPages;
  personalPages = personalPages;
  get currentPage() {
    return this.siteNav.currentPage;
  }
  userName = '';
  userEmail = '';
  userId = '';

  get avatarUrl() {
    return this.supabase.avatarUrl;
  }

  constructor(
    private readonly router: Router,
    private readonly supabase: SupabaseService,
    private siteNav: SiteNavigationService
  ) {
    this.getUserDetails();
  }

  ngAfterViewInit() {
    const target = document.querySelector('#profile-dropdown') as HTMLElement;

    document.addEventListener('click', (event) => {
      const withinBoundaries = event.composedPath().includes(target);

      if (!withinBoundaries) {
        this.userMenuOpen = false;
      }
    });
  }

  async getUserDetails() {
    const { data: profile, error, status } = await this.supabase.profile();
    this.userEmail = this.supabase.session?.user?.email || '';
    this.userName = profile.username;
    this.userId = this.supabase.user?.id || '';
  }

  goToRoute(route: string) {
    const currentPage = this.siteNav.getCurrentPage(route);
    if (currentPage) {
      this.router.navigate([currentPage.route]);
    }
  }

  signOut() {
    this.supabase.signOut();
  }
}
