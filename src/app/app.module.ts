import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {IonicStorageModule} from '@ionic/storage-angular';
import {StorageService} from './_services/storage.service';
import {LoaderComponent} from "./shared/loader/loader.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NoDataComponent} from "./shared/no-data/no-data.component";
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [AppComponent, LoaderComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    //ReactiveFormsModule,
    SharedModule
  ],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, StorageService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
