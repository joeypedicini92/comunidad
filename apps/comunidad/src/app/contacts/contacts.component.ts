import { Component, OnInit } from '@angular/core';
import { Contact, GetMyContactsQueries } from '../supabase/queries/get-my-contacts';

@Component({
  selector: 'comunidad-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  constructor(private readonly getMyContacts: GetMyContactsQueries) {}
  contacts: Contact[] = [];
  async ngOnInit() {
    const data = await this.getMyContacts.getMyContacts();

    this.contacts = data || [];
  }
}
