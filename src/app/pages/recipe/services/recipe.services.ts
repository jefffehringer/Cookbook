import { environment } from '@cook/environment/environment';
import { Injectable } from '@angular/core';
import { StoreService } from '@cook/store/store.service';
import { HttpService } from '@cook/store/http.service';
import { Recipe } from '@cook/models/recipe.interface';
import { Subject, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Tag } from '@cook/models/tag.interface';

@Injectable({
  providedIn: 'root',
})
export class RecipeService extends StoreService<Recipe> {
  protected addTagSuccessSubject = new Subject<Tag>();
  addTagSuccess$ = this.addTagSuccessSubject.asObservable();

  constructor(
    protected http: HttpService<Recipe>, private httpClient: HttpClient
  ) {
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

  addTag(recipeId: number, tagName: string) {
    const exist = this.getCached(recipeId);

    if (exist.tags.findIndex(i => i.name === tagName) < 0) {
      exist.tags.push({ name: tagName, id: -1 });
    }

    this.httpClient
      .post<Tag>(this.settings.url + recipeId + '/tag', { name: tagName })
      .pipe(
        catchError((e) => {
          this.getError = e;
          return throwError(`Error unliking ${this.settings.itemName}`);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((d) => {
        if (exist) {
          const idx = exist.tags.findIndex(i => i.name === tagName);

          if (idx >= 0) {
            exist.tags[idx] = d;
          } else {
            exist.tags.push(d);
          }
        }
      });
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
