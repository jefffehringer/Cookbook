import { environment } from '@cook/environment/environment';
import { Injectable } from '@angular/core';
import { StoreService } from '@cook/store/store.service';
import { Tag } from '@cook/models/tag.interface';
import { catchError, finalize } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TagService extends StoreService<Tag> {
  private tagPickedSubject = new Subject<Tag>();
  tagPicked$ = this.tagPickedSubject.asObservable();

  constructor(
    protected http: HttpClient
  ) {
    super(
      http,
      {
        url: environment.apiUrl + 'tags/',
        idField: 'id',
        itemName: 'Tag'
      }
    );
  }

  pickTag(tag: Tag) {
    this.tagPickedSubject.next(tag);
  }

  search(text: string) {
    if (text === null) {
      return;
    }

    this.loading = true;

    this.http
      .get<Tag[]>(`${this.settings.url}search/${text}`)
      .pipe(
        catchError((e) => {
          this.getError = e;
          return throwError(`Error searching for ${this.settings.itemName}`);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((d) => {
        this.items = d;
      });
  }
}
