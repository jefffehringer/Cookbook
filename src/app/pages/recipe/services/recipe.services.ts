import { environment } from '@cook/environment/environment';
import { Injectable } from '@angular/core';
import { StoreService } from '@cook/store/store.service';
import { Recipe } from '@cook/models/recipe.interface';
import { Subject, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Tag } from '@cook/models/tag.interface';

@Injectable({
  providedIn: 'root',
})
export class RecipeService extends StoreService<Recipe> {
  private addTagSuccessSubject = new Subject<Tag>();
  addTagSuccess$ = this.addTagSuccessSubject.asObservable();

  constructor(
    protected http: HttpClient
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

  addTagToSelected(tag: Tag) {
    if (this.selected) {
      this.selected.tags.push(tag);
    }
  }

  addTag(recipeId: number, tag: Tag) {
    const exist = this.getCached(recipeId);

    if (exist.tags.findIndex(i => i.name === tag.name) < 0) {
      exist.tags.push({ name: tag.name, id: -1 });
    }

    this.http
      .post<Tag>(this.settings.url + recipeId + '/tag', tag)
      .pipe(
        catchError((e) => {
          this.getError = e;
          return throwError(`Error unliking ${this.settings.itemName}`);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((d) => {
        if (exist) {
          const idx = exist.tags.findIndex(i => i.name === tag.name);

          if (idx >= 0) {
            exist.tags[idx] = d;
          } else {
            exist.tags.push(d);
          }
        }
      });
  }

  whatsForDinner() {
    this.loading = true;
    this.selected = null;

    this.http
      .get<Recipe>(`${this.settings.url}random`)
      .pipe(
        catchError((e) => {
          this.getError = e;
          return throwError(`Error loading ${this.settings.itemName}`);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((d) => {
        this.replaceOrAdd(d);
        this.selected = d;
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
