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

  constructor(private readonly supabase: SupabaseService) {}

  ngOnInit() {
    this.supabase.authChanges((_, session) => (this.session = session));
  }

  ngAfterViewInit() {
    setTimeout(() => {
      try {
        if (!this.pwaInstall.nativeElement.getInstalledStatus()) {
          this.pwaInstall.nativeElement.openPrompt();
        }
      } catch (e) {
        console.log(e);
      }
    }, 3000);
  }
}
