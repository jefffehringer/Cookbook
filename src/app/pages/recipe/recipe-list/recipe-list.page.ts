import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.services';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.page.html',
  styleUrls: ['./recipe-list.page.scss'],
})
export class RecipeListPage implements OnInit {
  recipes$ = this.recipeService.items$;

  constructor(
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.recipeService.load();
  }
}
