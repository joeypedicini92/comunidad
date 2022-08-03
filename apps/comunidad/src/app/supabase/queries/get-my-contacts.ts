import { Injectable } from "@angular/core";
import { SupabaseService } from "../supabase.service";

export interface Contact {
  id: string;
  name: string;
  phone_number: string;
  created_at: Date;
  enabled_text_updates: boolean;
//TODO add other columns
}

@Injectable({
  providedIn: 'root'
})
export class GetMyContactsQueries extends SupabaseService {
  async getMyContacts() {
    const res = await this.supabase.from<Contact>('contacts').select();
    return res.body;
  }
}
