import { Component, OnInit } from '@angular/core';
import { Profile, SupabaseService } from '../../supabase/supabase.service';

@Component({
  selector: 'comunidad-account-edit-component',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss'],
})
export class AccountEditComponent implements OnInit {
  loading = false;
  profile: Profile;

  constructor(private readonly supabase: SupabaseService) {
    this.profile = {
      username: '',
      email: '',
      avatar_url: '',
    };
  }

  get session() {
    return this.supabase.session;
  }

  ngOnInit() {
    this.getProfile();
  }

  async getProfile() {
    try {
      this.loading = true;
      const { data: profile, error, status } = await this.supabase.profile();

      if (error && status !== 406) {
        throw error;
      }

      if (profile) {
        this.profile = profile;
      }
    } catch (error: any) {
      alert(error.message)
    } finally {
      this.loading = false;
    }
  }

  async updateProfile(username: string, email: string, avatar_url: string = '') {
    try {
      this.loading = true;
      await this.supabase.updateProfile({username, email, avatar_url});
    } catch (error: any) {
      alert(error.message);
    } finally {
      this.loading = false;
    }
  }

  submit() {
    this.updateProfile(this.profile.username, this.profile.email, this.profile.avatar_url);
  }
}
