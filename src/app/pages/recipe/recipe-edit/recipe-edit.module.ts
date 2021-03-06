import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipeEditPageRoutingModule } from './recipe-edit-routing.module';

import { RecipeEditPage } from './recipe-edit.page';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipeEditPageRoutingModule,
    SharedModule
  ],
  declarations: [RecipeEditPage]
})
export class RecipeEditPageModule {}
