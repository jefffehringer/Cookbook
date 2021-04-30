import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipeDetailPageRoutingModule } from './recipe-detail-routing.module';

import { RecipeDetailPage } from './recipe-detail.page';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipeDetailPageRoutingModule,
    SharedModule
  ],
  declarations: [RecipeDetailPage]
})
export class RecipeDetailPageModule {}
