import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TextEntryComponent } from './text-entry/text-entry.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: 'profile', component: AccountComponent },
    { path: 'daily-entry', component: TextEntryComponent }
  ], },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
