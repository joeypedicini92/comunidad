import {Component, Input, OnInit} from '@angular/core';
import {Profile, SupabaseService} from "../supabase/supabase.service";

@Component({
  selector: 'comunidad-account',
  template: `
<div>
  <h3 class="text-lg leading-6 font-medium text-gray-900">Account Information</h3>
  <p class="mt-1 max-w-2xl text-sm text-gray-500">Personal details.</p>
</div>
<div class="mt-5 border-t border-gray-200">
  <dl class="divide-y divide-gray-200">
    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
      <dt class="text-sm font-medium text-gray-500">Full name</dt>
      <dd class="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        <span class="flex-grow">{{profile?.username ?? ''}}</span>
      </dd>
    </div>
    <div class="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
      <dt class="text-sm font-medium text-gray-500">Email address</dt>
      <dd class="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        <span class="flex-grow">{{session?.user?.email}}</span>
      </dd>
    </div>
  </dl>
</div>

  `
})
export class AccountComponent implements OnInit {
  loading = false;
  profile: Profile | undefined;

  constructor(private readonly supabase: SupabaseService) { }

  get session() {
    return this.supabase.session;
  }

  ngOnInit() {
    this.getProfile();
  }

  async getProfile() {
    try {
      this.loading = true;
      const {data: profile, error, status} = await this.supabase.profile;

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
}
