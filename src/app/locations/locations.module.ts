import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocationsPage } from './locations.page';
import { LocationsPageRoutingModule } from './locations-routing.module';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LocationsPageRoutingModule,
    SharedModule
  ],
  declarations: [LocationsPage]
})
export class LocationsPageModule {}
