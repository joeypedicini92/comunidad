import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TextEntryComponent } from './text-entry/text-entry.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: 'profile', component: AccountComponent },
    { path: 'daily-entry', component: TextEntryComponent },
    { path: 'my-journal', component: NotFoundComponent },
    { path: 'dad-feed', component: NotFoundComponent }
  ], },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
