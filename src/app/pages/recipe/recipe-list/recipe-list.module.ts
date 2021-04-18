import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipeListPageRoutingModule } from './recipe-list-routing.module';

import { RecipeListPage } from './recipe-list.page';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipeListPageRoutingModule,
    SharedModule
  ],
  declarations: [RecipeListPage]
})
export class RecipeListPageModule {}
