import { Injectable } from '@angular/core';

export interface Page {
  name: string;
  route: string;
}

@Injectable({
  providedIn: 'root'
})
export class SiteNavigationService {
  private _currentPage: Page;

  constructor() {
    this._currentPage = {
      name: '',
      route: ''
    }
  }

  get currentPage() {
    return this._currentPage;
  }

  set currentPage(page: Page) {
    this._currentPage = page;
  }
}
