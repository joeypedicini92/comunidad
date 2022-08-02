import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { DadFeedComponent } from './dad-feed/dad-feed.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyJournalComponent } from './my-journal/my-journal.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TextEntryComponent } from './text-entry/text-entry.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children:
    [
      { path: 'profile', component: AccountComponent },
      { path: 'daily-entry', component: TextEntryComponent },
      { path: 'my-journal', component: MyJournalComponent },
      { path: 'dad-feed', component: DadFeedComponent }
    ],
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
