import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeEditFormComponent } from 'app/pages/recipe/recipe-edit-form/recipe-edit-form.component';

const comps = [RecipeEditFormComponent];

@NgModule({
  declarations: [comps],
  imports: [
    CommonModule
  ],
  exports: [comps]
})
export class ComponentModule { }
