import { Component, OnInit } from '@angular/core';
import { Contact, SupabaseService } from '../supabase/supabase.service';

@Component({
  selector: 'comunidad-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  constructor(private readonly supabase: SupabaseService) {}
  contacts: Contact[] = [];
  async ngOnInit() {
    const data = await this.supabase.getMyContacts();

    this.contacts = data || [];
  }
}
