import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountEditComponent } from './account/account-edit/account-edit.component';
import { AccountComponent } from './account/account.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DadFeedComponent } from './dad-feed/dad-feed.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyJournalComponent } from './my-journal/my-journal.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';
import { DailyEntryComponent } from './daily-entry/daily-entry.component';
import { CreatePostComponent } from './create-post/create-post.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'profile/edit', component: AccountEditComponent },
      { path: 'profile', component: AccountComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'daily-entry', component: DailyEntryComponent },
      { path: 'generic-entry', component: CreatePostComponent },
      { path: 'my-journal', component: MyJournalComponent },
      { path: 'dad-feed', component: DadFeedComponent },
      { path: '', redirectTo: 'daily-entry', pathMatch: 'full' },
    ],
  },
  { path: 'public/:id', component: PublicProfileComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
