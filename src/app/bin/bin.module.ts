import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BinPageRoutingModule } from './bin-routing.module';

import { BinPage } from './bin.page';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BinPageRoutingModule,
    SharedModule
  ],
  declarations: [BinPage]
})
export class BinPageModule {}
