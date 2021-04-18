import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TagSearchComponent } from './components/tag-search/tag-search.component';
import { FormsModule } from '@angular/forms';
import { RecipeEditFormComponent } from 'app/pages/recipe/recipe-edit-form/recipe-edit-form.component';
import { RecipeViewCardComponent } from './components/recipe-view-card/recipe-view-card.component';
import { RouterModule } from '@angular/router';

const comps = [RecipeEditFormComponent, TagSearchComponent, RecipeViewCardComponent];

@NgModule({
  declarations: [comps],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule
  ],
  exports: [comps]
})
export class SharedModule { }
