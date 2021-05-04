import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhatsForDinnerPageRoutingModule } from './whats-for-dinner-routing.module';

import { WhatsForDinnerPage } from './whats-for-dinner.page';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhatsForDinnerPageRoutingModule,
    SharedModule
  ],
  declarations: [WhatsForDinnerPage]
})
export class WhatsForDinnerPageModule {}
