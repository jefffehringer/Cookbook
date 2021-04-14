import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.services';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.page.html',
  styleUrls: ['./recipe-list.page.scss'],
})
export class RecipeListPage implements OnInit {
  recipes$ = this.recipeService.items$;
  showHeader = true;

  constructor(
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.recipeService.load();
  }

  like(alreadyLiked: boolean, recipeId: number, event) {
    // TODO Improve this. Also need to update current recipe's liked total
    if (alreadyLiked) {
      this.recipeService.unlike(recipeId);
    } else {
      this.recipeService.like(recipeId);
    }

    event.stopPropagation();
    return false;
  }
}
