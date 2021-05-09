import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileDetailPageRoutingModule } from './profile-detail-routing.module';

import { ProfileDetailPage } from './profile-detail.page';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileDetailPageRoutingModule
  ],
  declarations: [ProfileDetailPage, ProfileEditComponent]
})
export class ProfileDetailPageModule {}
