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
        url: environment.apiUrl + 'recipes/',
        idField: 'id',
        itemName: 'Recipe'
      }
    );
  }

  generate(): Recipe {
    return {id: '', name: '', notes: '', author: '',
      ingredients: [], steps: [], cooktime: '',
      tags: [], foodType: ''
    };
  }
}
