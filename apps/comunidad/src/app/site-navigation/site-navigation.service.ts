import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

export interface Page {
  name: string;
  route: string;
  description?: string;
}

export const appPages: Page[] = [
  {
    name: 'Daily Entry',
    route: 'daily-entry',
    description: `This is your daily journaling page. The idea is to get in the habit of writing daily. Write about whatever you did or felt throughout the day. Each day will have a sample prompt to help you get started.`,
  },
  {
    name: 'New Post',
    route: 'generic-entry',
    description: `Use this page for any additional posts you want to make to your journal. There is no limit to the number of these posts you can make in a day.`,
  },
  {
    name: 'My Journal',
    route: 'my-journal',
    description: `This is your journal. You can view all of your posts here. You can also edit or delete any of your posts.`,
  },
  {
    name: 'La Comunidad',
    route: 'my-comunidad',
    description: `See what others were writing about yesterday.`,
  },
];

export const personalPages: Page[] = [
  {
    name: 'My Profile',
    route: 'profile',
    description: `This is your profile page. You can edit your profile information here.`,
  },
  {
    name: 'Contacts',
    route: 'contacts',
    description: `This is your contacts page. You can add or remove contacts here.`,
  },
];

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
