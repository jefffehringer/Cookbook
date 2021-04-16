import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '@cook/models/recipe.interface';

@Component({
  selector: 'app-recipe-edit-form',
  templateUrl: './recipe-edit-form.component.html',
  styleUrls: ['./recipe-edit-form.component.scss'],
})
export class RecipeEditFormComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() saved = new EventEmitter<Recipe>();
  @Output() tagAdded = new EventEmitter<string>();
  @Output() navigateBack = new EventEmitter<void>();
  newTag = '';
  newIngredient = '';
  newInstruction = '';
  constructor() {}

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

  addInstruction() {
    if (this.newInstruction.length > 0) {
      this.recipe.instructions.push(this.newInstruction);
      this.newInstruction = '';
    }
  }

  addIngredient() {
    if (this.newIngredient.length > 0) {
      this.recipe.ingredients.push(this.newIngredient);
      this.newIngredient = '';
    }
  }

  removeIngredient(idx: number) {
    this.recipe.ingredients.splice(idx, 1);
  }

  removeInstruction(idx: number) {
    this.recipe.instructions.splice(idx, 1);
  }

  goBack() {
    this.navigateBack.emit();
  }

  addTag() {
    if (this.newTag.length > 0) {
      this.tagAdded.emit(this.newTag);
      this.newTag = '';
    }
  }
}
