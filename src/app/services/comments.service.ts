import { environment } from '@cook/environment/environment';
import { Injectable } from '@angular/core';
import { StoreService } from '@cook/store/store.service';
import { HttpService } from '@cook/store/http.service';
import { Comment } from '@cook/models/comment.interface';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService extends StoreService<Comment> {
  constructor(protected http: HttpService<Comment>) {
    super(http, {
      url: environment.apiUrl + 'comments/',
      idField: 'id',
      itemName: 'Comment',
    });
  }

  loadByRecipe(recipeId: number) {
    this.loading = true;
    const url = environment.apiUrl + 'recipes/' + recipeId + '/comments';

    this.http
      .getAll(url)
      .pipe(
        catchError((e) => {
          this.loadError = e;
          return throwError(`Error loading ${this.settings.itemName}s`);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((d) => {
        this.items = d;
      });
  }

  addByRecipe(recipeId: number, content: string) {
    this.loading = true;

    const url = environment.apiUrl + 'recipes/' + recipeId + '/comments';

    this.http
      .post(url, { content })
      .pipe(
        catchError((e) => {
          this.getError = e;
          return throwError(`Error creating ${this.settings.itemName}`);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((d) => {
        this.replaceOrAdd(d);
        this.createSuccessSubject.next(d);
      });
  }
}
