import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '@cook/store/models/recipe.interface';
import { ItemReorderEventDetail } from '@ionic/core';

@Component({
  selector: 'app-recipe-edit-form',
  templateUrl: './recipe-edit-form.component.html',
  styleUrls: ['./recipe-edit-form.component.scss'],
})
export class RecipeEditFormComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() saved = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit() {}

  doReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    this.swap(this.recipe.ingredients, ev.detail.from, ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }

  reorderInstructions(ev: CustomEvent<ItemReorderEventDetail>) {

    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    const itemMove = this.recipe.steps.splice(ev.detail.from, 1)[0];
    this.recipe.steps.splice(ev.detail.to, 0, itemMove);
    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }

  swap(arr: any[], from: number, to: number) {
    if (from < 0 || from >= arr.length || to < 0 || to >= arr.length) {
      return;
    }

    const temp = arr[to];
    arr[to] = arr[from];
    arr[from] = temp;
  }

  trackByIndex(index, item) {
    return index;
  }

  trackByStep(index, item) {
    return index;
  }

  save() {
    this.saved.emit(this.recipe);
  }

  addInstruction(recipe: Recipe) {
    recipe.steps.push({instructions: '', order: null});
  }

  addIngredient(recipe: Recipe) {
    recipe.ingredients.push('');
  }

}
