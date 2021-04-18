import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TagSearchComponent } from './components/tag-search/tag-search.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [TagSearchComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [TagSearchComponent]
})
export class SharedModule { }
