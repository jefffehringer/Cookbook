import { environment } from '@cook/environment/environment';
import { Injectable } from '@angular/core';
import { StoreService } from '@cook/store/store.service';
import { HttpService } from '@cook/store/http.service';
import { RecipeLike } from '@cook/models/recipe-like.interface';

@Injectable({
  providedIn: 'root'
})
export class RecipeLikeService extends StoreService<RecipeLike> {
  constructor(
    protected http: HttpService<RecipeLike>
  ) {
    super(
      http,
      {
        url: environment.apiUrl + 'recipeLikes/',
        idField: '_id',
        itemName: 'RecipeLike'
      }
    );
  }
}
