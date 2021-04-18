import { Component, OnInit, ViewChild } from '@angular/core';
import { LikeClickEvent } from '@cook/models/like-click-event.interface';
import { IonInfiniteScroll } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { RecipeService } from '../services/recipe.services';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.page.html',
  styleUrls: ['./recipe-list.page.scss'],
})
export class RecipeListPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  recipes$ = this.recipeService.items$.pipe(tap(() => this.dataLoaded()));
  showHeader = true;
  currentPage = 1;
  pageSize = 2;
  lastInfiniteEventTarget: any;
  noMoreData = false;

  constructor(
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.recipeService.load('', '', this.currentPage, this.pageSize);

    this.recipeService.noLoadResults$.subscribe(() => {
      this.infiniteScroll.disabled = true;
      this.noMoreData = true;
    });
  }

  like(likeEvent: LikeClickEvent) {
    if (likeEvent.alreadyLiked) {
      this.recipeService.unlike(likeEvent.recipeId);
    } else {
      this.recipeService.like(likeEvent.recipeId);
    }
  }

  loadData(event) {
    this.lastInfiniteEventTarget = event.target;

    this.currentPage++;
    this.recipeService.load('', '', this.currentPage, this.pageSize, false, true);
  }

  dataLoaded() {
    if (this.lastInfiniteEventTarget) {
      this.lastInfiniteEventTarget.complete();
    }
  }
}
