import { Component } from '@angular/core';
import { Session } from '@supabase/supabase-js';

@Component({
  selector: 'comunidad-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  title = 'comunidad';
  currentRoute = 'Daily Entry';

}
