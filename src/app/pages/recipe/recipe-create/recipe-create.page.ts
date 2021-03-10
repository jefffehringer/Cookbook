import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.services';
import { Location } from '@angular/common';
import { Recipe } from '@cook/store/models/recipe.interface';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.page.html',
  styleUrls: ['./recipe-create.page.scss'],
})
export class RecipeCreatePage implements OnInit {
  recipe$ = this.recipeService.selected$;
  loading$ = this.recipeService.loading$;

  constructor(
    private recipeService: RecipeService,
    private location: Location
  ) { }

  ngOnInit() {
    this.recipeService.select(this.recipeService.generate());

    this.recipeService.createSuccess$
      .subscribe(() => this.goBack());
  }

  ionViewDidLeave() {
    this.recipeService.get(null);
  }

  save(recipe: Recipe) {
    this.recipeService.add(recipe);
  }

  goBack() {
    this.location.back();
  }
}
