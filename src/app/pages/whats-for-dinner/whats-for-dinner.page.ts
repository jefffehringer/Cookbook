import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'app/pages/recipe/services/recipe.services';
import { CommentService } from 'app/services/comments.service';
import { combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UserProfileService } from '../profile/services/user-profile.service';

@Component({
  selector: 'app-whats-for-dinner',
  templateUrl: './whats-for-dinner.page.html',
  styleUrls: ['./whats-for-dinner.page.scss'],
})
export class WhatsForDinnerPage implements OnInit {
  recipe$ = this.recipeService.selected$;
  comments$ = this.commentService.items$;
   canEdit$ = combineLatest([this.recipe$, this.profileService.selected$]).pipe(
    filter(([recipe, user]) => recipe !== null && user !== null),
    map(
      ([recipe, user]) =>
        recipe.userProfile.userProfileId === user.userProfileId
    )
  );

  constructor(
    private recipeService: RecipeService,
    private commentService: CommentService,
    private profileService: UserProfileService,
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.recipeService.whatsForDinner();
  }

  ionViewDidLeave() {
    this.recipeService.get(null);
  }
}
