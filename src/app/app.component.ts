import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Recipes', url: '/recipes', icon: 'pizza' },
    { title: 'Tags', url: '/folder/Outbox', icon: 'pricetags' },
    { title: 'Cookbooks', url: '/folder/Favorites', icon: 'book' },
    { title: 'Whats for Dinner?', url: '/folder/Archived', icon: 'shuffle' }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
