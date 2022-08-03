import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import {SupabaseService} from "../supabase/supabase.service";
import { Page, SiteNavigationService } from './site-navigation.service';

@Component({
  selector: 'comunidad-site-navigation',
  templateUrl: './site-navigation.component.html',
  styleUrls: ['./site-navigation.component.scss'],
})
export class SiteNavigationComponent implements AfterViewInit {
  menuOpen = false;
  appPages: Page[] = [
    {
      name: 'Daily Entry',
      route: 'daily-entry'
    },
    {
      name: 'My Journal',
      route: 'my-journal'
    },
    {
      name: 'Dad Feed',
      route: 'dad-feed'
    }
  ]

  personalPages: Page[] = [
    {
      name: 'My Profile',
      route: 'profile'
    },
    {
      name: 'Contacts',
      route: 'contacts'
    }
  ]

  currentPage: Page;
  userName = '';
  userEmail = '';

  constructor(private readonly router: Router, private readonly supabase: SupabaseService, private siteNav: SiteNavigationService) {
    this.currentPage = this.appPages[0];
    this.goToRoute(this.currentPage.route);
    this.getUserDetails();

  }

  ngAfterViewInit() {
    const target = document.querySelector('#profile-dropdown') as HTMLElement;

    document.addEventListener('click', (event) => {
      const withinBoundaries = event.composedPath().includes(target)

      if (!withinBoundaries) {
        this.menuOpen = false;
      }
    })
  }

  async getUserDetails() {
    const {data: profile, error, status} = await this.supabase.profile;
    this.userEmail = this.supabase.session?.user?.email || '';
    this.userName = profile.username;
  }

  goToRoute(route: string) {
    this.currentPage = this.appPages.find(page => page.route === route) || this.personalPages.find(page => page.route === route) || this.appPages[0];
    this.siteNav.currentPage = this.currentPage;
    this.router.navigate([this.currentPage.route]);
  }

  signOut() {
    this.supabase.signOut();
  }
}
