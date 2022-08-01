import { Component } from '@angular/core';
import { SiteNavigationService } from '../site-navigation/site-navigation.service';

@Component({
  selector: 'comunidad-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  title = 'comunidad';
  constructor(private readonly siteNav: SiteNavigationService) {
  }

  get currentPage () {
    return this.siteNav.currentPage.name;
  }
}
