import { Component } from '@angular/core';
import {Category} from "../_models/Category.model";
import {AddCategoryModalComponent} from "../shared/add-category-modal/add-category-modal.component";
import {AddLocationModalComponent} from "../shared/add-location-modal/add-location-modal.component";
import {ModalController} from "@ionic/angular";
import {Location} from "../_models/Location.model";
import {StateService} from "../_services/state.service";
import {ToastService} from "../_services/toast.service";

@Component({
  selector: 'app-locations',
  templateUrl: 'locations.page.html',
  styleUrls: ['locations.page.scss']
})
export class LocationsPage {
  locations: Array<Location> = [];

  constructor(private modal: ModalController, private state: StateService, private toast: ToastService) {
    this.state.locations$.subscribe(locations => {
      this.locations = locations;
      console.log('locations', locations);
    });
  }

  async openAddLocationModal() {
    const modal = await this.modal.create({
      component: AddLocationModalComponent,
    });

    modal.present();
  }

  async openEditLocation(location: Location) {
    const modal = await this.modal.create({
      component: AddLocationModalComponent,
      componentProps: {
        location,
        edit: true
      }
    });

    modal.present();
  }

  remove(uuid: string) {
    this.state.removeLocation(uuid);
    this.toast.show('Usunięto lokalizację');
  }
}
