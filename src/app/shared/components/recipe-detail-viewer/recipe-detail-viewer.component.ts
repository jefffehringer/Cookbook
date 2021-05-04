import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from '@cook/models/comment.interface';
import { Recipe } from '@cook/models/recipe.interface';
import { RecipeService } from 'app/pages/recipe/services/recipe.services';
import { CommentService } from 'app/services/comments.service';

@Component({
  selector: 'app-recipe-detail-viewer',
  templateUrl: './recipe-detail-viewer.component.html',
  styleUrls: ['./recipe-detail-viewer.component.scss'],
})
export class RecipeDetailViewerComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() comments: Comment[];
  @Input() canEdit: boolean = false;
  newComment = '';

  constructor(
    private commentService: CommentService,
    private recipeService: RecipeService
  ) { }

  ngOnInit() { }

  like() {
    // TODO Improve this. Also need to update current recipe's liked total
    if (this.recipe.liked) {
      this.recipeService.unlike(this.recipe.id);
    } else {
      this.recipeService.like(this.recipe.id);
    }
  }

  addComment() {
    // TODO Change how these are added (Even make the commenter a sub-component)
    this.commentService.addByRecipe(this.recipe.id, this.newComment);
    this.newComment = '';
  }
}
