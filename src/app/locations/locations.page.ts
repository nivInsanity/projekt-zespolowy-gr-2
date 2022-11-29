import { Component } from '@angular/core';
import {Category} from "../_models/Category.model";
import {AddCategoryModalComponent} from "../shared/add-category-modal/add-category-modal.component";
import {AddLocationModalComponent} from "../shared/add-location-modal/add-location-modal.component";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-locations',
  templateUrl: 'locations.page.html',
  styleUrls: ['locations.page.scss']
})
export class LocationsPage {

  constructor(private modal: ModalController) {}

  async openAddLocationModal(category: Category) {
    const modal = await this.modal.create({
      component: AddLocationModalComponent,
      componentProps: {
        category
      }
    });

    modal.present();
  }
}
