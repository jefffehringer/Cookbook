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
    const itemMove = this.recipe.ingredients.splice(ev.detail.from, 1)[0];
    this.recipe.ingredients.splice(ev.detail.to, 0, itemMove);

    ev.detail.complete();
  }

  reorderInstructions(ev: CustomEvent<ItemReorderEventDetail>) {
    const itemMove = this.recipe.steps.splice(ev.detail.from, 1)[0];
    this.recipe.steps.splice(ev.detail.to, 0, itemMove);

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
    recipe.steps.push('');
  }

  addIngredient(recipe: Recipe) {
    recipe.ingredients.push('');
  }

}
