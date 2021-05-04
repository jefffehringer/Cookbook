import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhatsForDinnerPage } from './whats-for-dinner.page';

const routes: Routes = [
  {
    path: '',
    component: WhatsForDinnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhatsForDinnerPageRoutingModule {}
