import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NoDataComponent} from './no-data/no-data.component';
import {AddProductModalComponent} from './add-product-modal/add-product-modal.component';
import {AddCategoryModalComponent} from './add-category-modal/add-category-modal.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule
  ],
  declarations: [
    NoDataComponent,
    AddCategoryModalComponent,
    AddProductModalComponent
  ],
  exports: [NoDataComponent]
})
export class SharedModule {}
