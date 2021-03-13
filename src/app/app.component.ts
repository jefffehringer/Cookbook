import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
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
    { title: 'Register', url: '/register', icon: 'shuffle' },
    { title: 'Login', url: '/login', icon: 'shuffle' }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    private platform: Platform
  ) {
    this.showRightPane = this.platform.platforms().indexOf('desktop') >= 0;
  }
}
