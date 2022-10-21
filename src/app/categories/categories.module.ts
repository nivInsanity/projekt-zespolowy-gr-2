import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriesPage } from './categories.page';
import { CategoriesPageRoutingModule } from './categories-routing.module';
import {NoDataComponent} from "../shared/no-data/no-data.component";
import {SharedModule} from "../shared/shared.module";
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CategoriesPageRoutingModule,
    SharedModule
  ],
  declarations: [CategoriesPage]
})
export class CategoriesPageModule {}
