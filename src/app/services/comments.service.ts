import { environment } from '@cook/environment/environment';
import { Injectable } from '@angular/core';
import { StoreService } from '@cook/store/store.service';
import { HttpService } from '@cook/store/http.service';
import { Comment } from '@cook/models/comment.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentService extends StoreService<Comment> {
  constructor(
    protected http: HttpService<Comment>
  ) {
    super(
      http,
      {
        url: environment.apiUrl + 'comments/',
        idField: 'id',
        itemName: 'Comment'
      }
    );
  }
}
