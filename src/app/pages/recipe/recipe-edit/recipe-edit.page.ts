import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../services/recipe.services';
import { Recipe } from '@cook/models/recipe.interface';
import { Location } from '@angular/common';
import { Tag } from '@cook/models/tag.interface';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.page.html',
  styleUrls: ['./recipe-edit.page.scss'],
})
export class RecipeEditPage implements OnInit {
  recipe$ = this.recipeService.selected$;
  loading$ = this.recipeService.loading$;
  recipeId = 0;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.recipeId = +this.route.snapshot.paramMap.get('id');
    this.recipeService.get(this.recipeId);

    this.recipeService.updateSuccess$.subscribe((a) => this.goBack());
  }

  ionViewDidLeave() {
    this.recipeService.get(null);
  }

  save(recipe: Recipe) {
    this.recipeService.update(recipe);
  }

  goBack() {
    this.location.back();
  }

  addTag(tag: Tag) {
    this.recipeService.addTag(this.recipeId, tag);
  }
}
