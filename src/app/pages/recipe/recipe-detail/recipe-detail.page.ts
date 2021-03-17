import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '@cook/models/comment.interface';
import { UserProfileService } from 'app/pages/profile/services/user-profile.service';
import { CommentService } from 'app/services/comments.service';
import { tap } from 'rxjs/operators';
import { RecipeService } from '../services/recipe.services';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {
  recipe$ = this.recipeService.selected$
    .pipe(
      tap(r => this.haveRecipeValue = r !== null)
    );
  loading$ = this.recipeService.loading$;
  loadingComments$ = this.commentService.loading$;
  comments$ = this.commentService.items$;
  haveRecipeValue = false;
  newComment = '';
  recipeId = '';

  constructor(
    private recipeService: RecipeService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private profileService: UserProfileService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.recipeId = this.route.snapshot.paramMap.get('id');
    this.recipeService.get(this.recipeId);
    this.commentService.load(`recipeId=${this.recipeId}`);
    this.newComment = '';
  }

  ionViewDidLeave() {
    this.recipeService.get(null);
  }

  addComment() {
    // TODO Change how these are added (Even make the commenter a sub-component)
    const comment: Comment = {
      id: null,
      recipeId: this.recipeId,
      content: this.newComment,
      createdDate: new Date(),
      createdBy: this.profileService.currentProfile()
    };

    this.commentService.add(comment);
    this.newComment = '';
  }
}
