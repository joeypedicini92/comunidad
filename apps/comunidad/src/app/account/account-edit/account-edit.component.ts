import { Component } from '@angular/core';
import { SupabaseService } from '../../supabase/supabase.service';
import { AccountComponent } from '../account.component';

@Component({
  selector: 'comunidad-account-edit-component',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss'],
})
export class AccountEditComponent extends AccountComponent {
  constructor(supabase: SupabaseService) {
    super(supabase);
  }
}
