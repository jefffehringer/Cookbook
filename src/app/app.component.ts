import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AuthService } from './services/security/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showRightPane = false;
  public appPages = [
    { title: 'Recipes', url: '/recipes', icon: 'pizza' },
    { title: 'Tags', url: '/folder/Tags', icon: 'pricetags' },
    { title: 'Cookbooks', url: '/folder/Cookbooks', icon: 'book' },
    { title: 'Whats for Dinner?', url: '/folder/Dinner', icon: 'shuffle' },
    { title: 'Register', url: '/register', icon: 'newspaper' },
    { title: 'Login', url: '/login', icon: 'log-in' }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    private platform: Platform,
    private auth: AuthService
  ) {
    this.showRightPane = this.platform.platforms().indexOf('desktop') >= 0;
  }

  logout() {
    this.auth.signOut();
  }
}
