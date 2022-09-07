import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SupabaseService } from './supabase/supabase.service';

@Component({
  selector: 'comunidad-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  session = this.supabase.session;
  @ViewChild('pwaInstall', { static: true }) pwaInstall: any;
  pwaSeen = false;

  constructor(private readonly supabase: SupabaseService) {
    if (window.localStorage.getItem('pwa-install')) {
      this.pwaSeen = true;
    }
  }

  ngOnInit() {
    this.supabase.authChanges((_, session) => (this.session = session));
  }

  ngAfterViewInit() {
    setTimeout(() => {
      try {
        if (
          !this.pwaInstall.nativeElement.getInstalledStatus() &&
          !this.pwaSeen
        ) {
          this.pwaInstall.nativeElement.openPrompt();
          window.localStorage.setItem('pwa-install', 'true');
        }
      } catch (e) {
        console.log(e);
      }
    }, 3000);
  }
}
