import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeCreatePage } from './recipe-create.page';

const routes: Routes = [
  {
    path: '',
    component: RecipeCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeCreatePageRoutingModule {}
