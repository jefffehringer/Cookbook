import { environment } from '@cook/environment/environment';
import { Injectable } from '@angular/core';
import { StoreService } from '@cook/store/store.service';
import { HttpService } from '@cook/store/http.service';
import { Recipe } from '@cook/models/recipe.interface';

@Injectable({
  providedIn: 'root'
})
export class RecipeService extends StoreService<Recipe> {
  constructor(
    protected http: HttpService<Recipe>
  ) {
    super(
      http,
      {
        url: 'http://localhost:3000/recipes/',
        idField: '_id',
        itemName: 'Recipe'
      }
    );
  }

  generate(): Recipe {
    return {_id: '', name: '', notes: '', author: '',
      ingredients: [], steps: [], cooktime: '',
      tags: [], foodType: '', description: '',
      numberLikes: 0,
      createdBy: {
        id: null,
        name: '',
        uid: null,
        email: '',
        location: ''
      }
    };
  }
}
