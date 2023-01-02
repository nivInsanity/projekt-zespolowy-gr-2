import { Component, OnInit } from '@angular/core';
import {Product} from "../_models/Product.model";
import {StateService} from "../_services/state.service";
import {getExpirationDays} from '../_helpers/helpers';
import {ToastService} from "../_services/toast.service";
import {AddProductModalComponent} from "../shared/add-product-modal/add-product-modal.component";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-bin',
  templateUrl: './bin.page.html',
  styleUrls: ['./bin.page.scss'],
})
export class BinPage implements OnInit {
  products: Array<Product> = [];
  getExpirationDays = getExpirationDays;

  constructor(private state: StateService, private toast: ToastService, private modal: ModalController) { }

  ngOnInit() {
    this.state.products$.subscribe(products => {
      this.products = products.filter(p => p.deleted);
    });
  }

  restore(uuid: string) {
    this.state.restoreProduct(uuid);
    this.toast.show('Przywrócono produkt');
  }

  async openEditProductModal(product: Product) {
    const modal = await this.modal.create({
      component: AddProductModalComponent,
      componentProps: {
        product,
        edit: true
      }
    });

    modal.present();
  }
}
