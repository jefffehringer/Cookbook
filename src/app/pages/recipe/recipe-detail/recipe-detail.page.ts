import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '@cook/models/comment.interface';
import { RecipeLike } from '@cook/models/recipe-like.interface';
import { UserProfileService } from 'app/pages/profile/services/user-profile.service';
import { CommentService } from 'app/services/comments.service';
import { RecipeLikeService } from 'app/services/recipe-like.service';
import { combineLatest } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { RecipeService } from '../services/recipe.services';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {
  recipe$ = this.recipeService.selected$.pipe(
    tap((r) => (this.haveRecipeValue = r !== null))
  );
  loading$ = this.recipeService.loading$;
  loadingComments$ = this.commentService.loading$;
  comments$ = this.commentService.items$;
  haveRecipeValue = false;
  canEdit$ = combineLatest([this.recipe$, this.profileService.selected$]).pipe(
    filter(([recipe, user]) => recipe !== null && user !== null),
    map(
      ([recipe, user]) =>
        recipe.userProfile.userProfileId === user.userProfileId
    )
  );
  newComment = '';
  recipeId = 0;

  constructor(
    private recipeService: RecipeService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private profileService: UserProfileService,
    private recipeLikeService: RecipeLikeService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.recipeId = +this.route.snapshot.paramMap.get('id');
    this.recipeService.get(this.recipeId);
    this.commentService.loadByRecipe(this.recipeId);
    this.newComment = '';
  }

  ionViewDidLeave() {
    this.recipeService.get(null);
  }

  addComment() {
    // TODO Change how these are added (Even make the commenter a sub-component)
    this.commentService.addByRecipe(this.recipeId, this.newComment);
    this.newComment = '';
  }

  like(alreadyLiked: boolean, recipeId: number) {
    // TODO Improve this. Also need to update current recipe's liked total
    if (alreadyLiked) {
      this.recipeService.unlike(recipeId);
    } else {
      this.recipeService.like(recipeId);
    }
  }
}
