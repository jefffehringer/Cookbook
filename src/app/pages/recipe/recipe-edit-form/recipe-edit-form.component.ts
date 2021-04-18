import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '@cook/models/recipe.interface';
import { Tag } from '@cook/models/tag.interface';
import { TagService } from 'app/services/tag.service';

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
  searchResults$ = this.tagService.items$;
  newTag = '';
  newIngredient = '';
  newInstruction = '';
  showSearch = false;
  constructor(
    private tagService: TagService
  ) {}

  ngOnInit() {
    // TODO: These might cause problems since this is a sub-component it might not init/destroy every time
    this.tagService.tagPicked$.subscribe(t => {
      this.recipe.tags.push(t);
    });

    this.tagService.createSuccess$.subscribe(t => {
      const exist = this.recipe.tags.find(e => e.name.toLowerCase() === t.name.toLowerCase());
      if (exist && exist.id === -1) {
        exist.id = t.id;
      }
    });
  }

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
}
