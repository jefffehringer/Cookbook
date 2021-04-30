import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from '@cook/models/comment.interface';
import { Recipe } from '@cook/models/recipe.interface';

@Component({
  selector: 'app-recipe-detail-viewer',
  templateUrl: './recipe-detail-viewer.component.html',
  styleUrls: ['./recipe-detail-viewer.component.scss'],
})
export class RecipeDetailViewerComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() comments: Comment[];
  @Input() canEdit: boolean = false;
  @Output() likeClicked = new EventEmitter<void>();
  @Output() commentAdded = new EventEmitter<string>();
  newComment = '';

  constructor() { }

  ngOnInit() { }

  like() {
    this.likeClicked.emit();
  }

  addComment() {
    // TODO Change how these are added (Even make the commenter a sub-component)
    // this.commentService.addByRecipe(this.recipeId, this.newComment);
    this.commentAdded.emit(this.newComment);
    this.newComment = '';
  }
}
