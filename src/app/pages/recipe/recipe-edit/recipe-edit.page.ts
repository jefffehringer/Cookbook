import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../services/recipe.services';
import { ItemReorderEventDetail } from '@ionic/core';
import { Recipe } from '@cook/store/models/recipe.interface';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.page.html',
  styleUrls: ['./recipe-edit.page.scss'],
})
export class RecipeEditPage implements OnInit {
  recipe$ = this.recipeService.selected$;
  loading$ = this.recipeService.loading$;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  doReorder(ev: CustomEvent<ItemReorderEventDetail>, recipe: Recipe) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);


    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }

  reorderInstructions(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }

  ionViewDidEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    this.recipeService.get(id);
  }

  ionViewDidLeave() {
    this.recipeService.get(null);
  }

  trackByIndex(index, item) {
    return index;
  }

  trackByStep(index, item) {
    return index;
  }

  save(recipe: Recipe) {
    this.recipeService.update(recipe);
  }

  addInstruction(recipe: Recipe) {
    recipe.steps.push({instructions: '', order: null});
  }

  addIngredient(recipe: Recipe) {
    recipe.ingredients.push('');
  }
}
