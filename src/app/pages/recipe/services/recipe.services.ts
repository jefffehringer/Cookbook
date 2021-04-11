import { environment } from '@cook/environment/environment';
import { Injectable } from '@angular/core';
import { StoreService } from '@cook/store/store.service';
import { HttpService } from '@cook/store/http.service';
import { Recipe } from '@cook/models/recipe.interface';
import { throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecipeService extends StoreService<Recipe> {
  constructor(protected http: HttpService<Recipe>) {
    super(http, {
      url: environment.apiUrl + 'recipes/',
      idField: 'id',
      itemName: 'Recipe',
    });
  }

  like(recipeId: number) {
    const exist = this.getCached(recipeId);
    if (exist) {
      exist.liked = true;
      exist.likeCount += 1;

      this.replaceOrAdd(exist);
      this.select(exist);
    }
    this.http
      .post(this.settings.url + recipeId + '/like', {})
      .pipe(
        catchError((e) => {
          this.getError = e;
          return throwError(`Error liking ${this.settings.itemName}`);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((d) => {});
  }

  unlike(recipeId: number) {
    const exist = this.getCached(recipeId);
    if (exist) {
      exist.liked = false;
      exist.likeCount -= 1;

      this.replaceOrAdd(exist);
      this.select(exist);
    }

    this.http
      .post(this.settings.url + recipeId + '/unlike', {})
      .pipe(
        catchError((e) => {
          this.getError = e;
          return throwError(`Error unliking ${this.settings.itemName}`);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((d) => {});
  }

  generate(): Recipe {
    return {
      id: null,
      name: '',
      notes: '',
      author: '',
      ingredients: [],
      instructions: [],
      cooktime: '',
      tags: [],
      foodType: '',
      description: '',
      likeCount: 0,
      commentCount: 0,
      liked: false,
      userProfile: {
        name: '',
        userProfileId: null,
        email: '',
        location: '',
      },
    };
  }
}
