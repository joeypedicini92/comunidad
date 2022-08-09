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
import { NotFoundComponent } from './not-found/not-found.component';
import { MyJournalComponent } from './my-journal/my-journal.component';
import { DadFeedComponent } from './dad-feed/dad-feed.component';
import { PostCardComponent } from './post-card/post-card.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ContactsComponent } from './contacts/contacts.component';
import { AccountEditComponent } from './account/account-edit/account-edit.component';
import { AddContactComponent } from './add-contact/add-contact.component';

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    TextEntryComponent,
    AuthComponent,
    AccountComponent,
    DashboardComponent,
    SiteNavigationComponent,
    NotFoundComponent,
    MyJournalComponent,
    DadFeedComponent,
    PostCardComponent,
    ContactsComponent,
    AccountEditComponent,
    AddContactComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
