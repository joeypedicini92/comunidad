import { Injectable } from '@angular/core';
import { Contact, SupabaseService } from '../supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(private readonly supabase: SupabaseService) {
    this.getContacts();
  }
  contacts: Contact[] = [];
  userId = this.supabase.user?.id;

  async getContacts() {
    const data = await this.supabase.getMyContacts();

    this.contacts = data || [];

    return this.contacts;
  }

  async addContact(contact: Contact) {
    await this.supabase.addContact(contact);

    this.getContacts();
  }
}
