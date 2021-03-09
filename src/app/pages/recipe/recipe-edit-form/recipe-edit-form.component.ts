import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '@cook/store/models/recipe.interface';

@Component({
  selector: 'app-recipe-edit-form',
  templateUrl: './recipe-edit-form.component.html',
  styleUrls: ['./recipe-edit-form.component.scss'],
})
export class RecipeEditFormComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() saved = new EventEmitter<Recipe>();
  @Output() navigateBack = new EventEmitter<void>();

  constructor(

  ) { }

  ngOnInit() {}

  trackByIndex(index, item) {
    return index;
  }

  trackByStep(index, item) {
    return item;
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

  removeIngredient(idx: number) {
    this.recipe.ingredients.splice(idx, 1);
  }

  goBack() {
    this.navigateBack.emit();
  }
}
