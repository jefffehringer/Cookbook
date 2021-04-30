import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'app/pages/recipe/services/recipe.services';

@Component({
  selector: 'app-whats-for-dinner',
  templateUrl: './whats-for-dinner.page.html',
  styleUrls: ['./whats-for-dinner.page.scss'],
})
export class WhatsForDinnerPage implements OnInit {
  recipe$ = this.recipeService.selected$;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.recipeService.whatsForDinner();
  }

  ionViewDidLeave() {
    this.recipeService.get(null);
  }
}
