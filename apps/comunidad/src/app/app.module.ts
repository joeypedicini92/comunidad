import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { TextEntryComponent } from './text-entry/text-entry.component';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { SiteNavigationComponent } from './site-navigation/site-navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    TextEntryComponent,
    AuthComponent,
    AccountComponent,
    DashboardComponent,
    SiteNavigationComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
