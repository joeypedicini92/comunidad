import { Component, OnInit } from '@angular/core';
import { Contact } from '../supabase/supabase.service';
import { ContactsService } from './contacts.service';

@Component({
  selector: 'comunidad-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  constructor(private readonly contactsService: ContactsService) {}
  contacts: Contact[] = [];
  addContactDisplayed = false;

  async ngOnInit() {
    await this.getContacts();
  }

  addContact() {
    this.addContactDisplayed = true;
  }

  async getContacts() {
    const data = await this.contactsService.getContacts();

    this.contacts = data || [];
  }

  async addContactReturn(value: Contact) {
    if (value) {
      await this.contactsService.addContact(value);
      await this.getContacts();
    }
    this.addContactDisplayed = false;
  }
}
