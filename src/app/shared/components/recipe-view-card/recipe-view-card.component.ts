import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LikeClickEvent } from '@cook/models/like-click-event.interface';
import { Recipe } from '@cook/models/recipe.interface';

@Component({
  selector: 'app-recipe-view-card',
  templateUrl: './recipe-view-card.component.html',
  styleUrls: ['./recipe-view-card.component.scss'],
})
export class RecipeViewCardComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() liked = new EventEmitter<LikeClickEvent>();

  constructor() { }

  ngOnInit() { }

  likeClicked(alreadyLiked: boolean, recipeId: number, event) {
    this.liked.emit({ alreadyLiked, recipeId });
    event.stopPropagation();
    return false;
  }
}
