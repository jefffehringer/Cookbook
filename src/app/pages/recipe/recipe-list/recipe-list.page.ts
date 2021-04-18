import { Component, OnInit } from '@angular/core';
import { LikeClickEvent } from '@cook/models/like-click-event.interface';
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

  like(likeEvent: LikeClickEvent) {
    if (likeEvent.alreadyLiked) {
      this.recipeService.unlike(likeEvent.recipeId);
    } else {
      this.recipeService.like(likeEvent.recipeId);
    }
  }
}
