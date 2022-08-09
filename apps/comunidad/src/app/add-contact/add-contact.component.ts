import { Component, EventEmitter, Output } from '@angular/core';
import { ContactsService } from '../contacts/contacts.service';
import { Contact } from '../supabase/supabase.service';

@Component({
  selector: 'comunidad-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent {
  @Output() addContact = new EventEmitter<Contact>();

  name = '';
  email = '';
  userId: string;

  constructor(private readonly contactsService: ContactsService) {
    this.userId = contactsService.userId || '';
  }

  onSubmit() {
    this.addContact.emit({
      name: this.name,
      email: this.email,
      user_id: this.userId,
    });
  }

  onCancel() {
    this.addContact.emit(undefined);
  }
}
