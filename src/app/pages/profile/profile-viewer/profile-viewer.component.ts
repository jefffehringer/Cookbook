import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LikeClickEvent } from '@cook/models/like-click-event.interface';
import { IonInfiniteScroll } from '@ionic/angular';
import { RecipeService } from 'app/pages/recipe/services/recipe.services';
import { tap } from 'rxjs/operators';
import { UserProfile } from '../models/user-profile.interface';

@Component({
  selector: 'app-profile-viewer',
  templateUrl: './profile-viewer.component.html',
  styleUrls: ['./profile-viewer.component.scss'],
})
export class ProfileViewerComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  recipes$ = this.recipeService.items$.pipe(tap(() => this.dataLoaded()));
  @Input() profile: UserProfile;
  @Input() canEdit = false;
  currentPage = 1;
  pageSize = 2;
  lastInfiniteEventTarget: any;
  noMoreData = false;

  constructor(
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    console.log('init');

    this.recipeService.clearCached();
    this.recipeService.getByUserId(this.profile.userProfileId, this.currentPage, this.pageSize, true);

    this.recipeService.noLoadResults$.subscribe(() => {
      this.infiniteScroll.disabled = true;
      this.noMoreData = true;
    });
  }

  dataLoaded() {
    if (this.lastInfiniteEventTarget) {
      this.lastInfiniteEventTarget.complete();
    }
  }

  loadData(event) {
    this.lastInfiniteEventTarget = event.target;

    this.currentPage++;
    this.recipeService.getByUserId(this.profile.userProfileId, this.currentPage, this.pageSize, true);
  }

  like(likeEvent: LikeClickEvent) {
    if (likeEvent.alreadyLiked) {
      this.recipeService.unlike(likeEvent.recipeId);
    } else {
      this.recipeService.like(likeEvent.recipeId);
    }
  }
}
