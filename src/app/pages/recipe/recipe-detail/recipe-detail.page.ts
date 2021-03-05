import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { RecipeService } from '../services/recipe.services';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {
  recipe$ = this.recipeService.selected$
    .pipe(
      tap(r => this.haveRecipeValue = r !== null)
    );
  loading$ = this.recipeService.loading$;
  haveRecipeValue = false;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    this.recipeService.get(id);
  }

  ionViewDidLeave() {
    this.recipeService.get(null);
  }
}
