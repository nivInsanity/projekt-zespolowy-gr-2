import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NoDataComponent} from './no-data/no-data.component';
import {AddProductModalComponent} from './add-product-modal/add-product-modal.component';
import {AddCategoryModalComponent} from './add-category-modal/add-category-modal.component';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {HttpClientModule} from '@angular/common/http';
import {FilterProductsByCatIdPipe} from '../_pipes/filter-products-by-cat-id/filter-products-by-cat-id.pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    AngularSvgIconModule,
    HttpClientModule,
  ],
  declarations: [
    NoDataComponent,
    AddCategoryModalComponent,
    AddProductModalComponent,
    FilterProductsByCatIdPipe
  ],
  exports: [
    NoDataComponent,
    FilterProductsByCatIdPipe
  ]
})
export class SharedModule {}
