import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileEditPagePageRoutingModule } from './profile-edit-page-routing.module';

import { ProfileEditPagePage } from './profile-edit-page.page';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileEditPagePageRoutingModule
  ],
  declarations: [ProfileEditPagePage, ProfileEditComponent]
})
export class ProfileEditPagePageModule {}
