import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { UserProfileService } from './pages/profile/services/user-profile.service';
import { AuthService } from './services/security/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  profile$ = this.profileService.currentUser$;
  showRightPane = false;

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    private platform: Platform,
    private auth: AuthService,
    private profileService: UserProfileService
  ) {
    this.showRightPane = this.platform.platforms().indexOf('desktop') >= 0;
  }

  logout() {
    this.auth.signOut();
  }
}
