import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '@cook/models/comment.interface';
import { RecipeLike } from '@cook/models/recipe-like.interface';
import { UserProfileService } from 'app/pages/profile/services/user-profile.service';
import { CommentService } from 'app/services/comments.service';
import { RecipeLikeService } from 'app/services/recipe-like.service';
import { combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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
  liked$ = this.recipeLikeService.items$;
  canEdit$ = combineLatest([this.recipe$, this.profileService.selected$])
            .pipe(
              map(([recipe, user]) => recipe.createdBy.id === user.id)
            );
  newComment = '';
  recipeId = '';

  constructor(
    private recipeService: RecipeService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private profileService: UserProfileService,
    private recipeLikeService: RecipeLikeService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.recipeId = this.route.snapshot.paramMap.get('id');
    this.recipeService.get(this.recipeId);
    this.commentService.loadByRecipe(this.recipeId);
    // this.recipeLikeService.load(`recipeId=${this.recipeId}&user.userId=6Q0wBRDH1IeRZlECG66H0PPDXKD2`);
    this.newComment = '';
  }

  ionViewDidLeave() {
    this.recipeService.get(null);
  }

  addComment() {
    // TODO Change how these are added (Even make the commenter a sub-component)
    const comment: Comment = {
      _id: null,
      recipeId: this.recipeId,
      content: this.newComment,
      createdDate: null,
      createdBy: null
    };

    this.commentService.add(comment);
    this.newComment = '';
  }

  like(alreadyLiked: RecipeLike) {
    // TODO Improve this. Also need to update current recipe's liked total
    if (alreadyLiked) {
      this.recipeLikeService.delete(alreadyLiked);
    } else {
      const recipeLike: RecipeLike = {
        id: null,
        recipeId: this.recipeId,
        createdDate: new Date(),
        user: this.profileService.currentProfile()
      };

      this.recipeLikeService.add(recipeLike);
    }
  }
}
