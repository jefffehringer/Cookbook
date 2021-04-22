import { environment } from '@cook/environment/environment';
import { Injectable } from '@angular/core';
import { StoreService } from '@cook/store/store.service';
import { RecipeLike } from '@cook/models/recipe-like.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RecipeLikeService extends StoreService<RecipeLike> {
  constructor(protected http: HttpClient) {
    super(http, {
      url: environment.apiUrl + 'recipeLikes/',
      idField: 'id',
      itemName: 'RecipeLike',
    });
  }
}
