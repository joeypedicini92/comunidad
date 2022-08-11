import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

export interface Page {
  name: string;
  route: string;
}

export const appPages: Page[] = [
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

export const personalPages: Page[] = [
  {
    name: 'My Profile',
    route: 'profile'
  },
  {
    name: 'Contacts',
    route: 'contacts'
  }
]

@Injectable({
  providedIn: 'root'
})
export class SiteNavigationService {
  currentPage: Page;

  constructor(readonly router: Router) {
    this.currentPage = {
      name: '',
      route: ''
    }
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        const currentPage = this.getCurrentPage(
          event.urlAfterRedirects?.replace('/', '')
        );
        if(currentPage) {
          this.currentPage = currentPage;
        }
      }
    });
  }

  getCurrentPage(route: string) {
    return appPages.find(page => page.route === route) || personalPages.find(page => page.route === route);
  }
}
