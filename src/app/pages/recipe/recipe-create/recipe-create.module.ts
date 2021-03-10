import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipeCreatePageRoutingModule } from './recipe-create-routing.module';

import { RecipeCreatePage } from './recipe-create.page';
import { ComponentModule } from 'app/modules/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipeCreatePageRoutingModule,
    ComponentModule
  ],
  declarations: [RecipeCreatePage]
})
export class RecipeCreatePageModule {}
