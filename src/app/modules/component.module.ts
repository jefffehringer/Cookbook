import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeEditFormComponent } from 'app/pages/recipe/recipe-edit-form/recipe-edit-form.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

const comps = [RecipeEditFormComponent];

@NgModule({
  declarations: [comps],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [comps]
})
export class ComponentModule { }
