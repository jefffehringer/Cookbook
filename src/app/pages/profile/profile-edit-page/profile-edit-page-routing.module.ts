import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileEditPagePage } from './profile-edit-page.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileEditPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileEditPagePageRoutingModule {}
