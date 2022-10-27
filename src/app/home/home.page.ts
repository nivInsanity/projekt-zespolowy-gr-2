import { Component } from '@angular/core';
import {StateService} from '../_services/state.service';
import {Product} from '../_models/Product.model';
import {StorageService} from '../_services/storage.service';
import {AddCategoryModalComponent} from '../shared/add-category-modal/add-category-modal.component';
import {ModalController} from '@ionic/angular';
import {AddProductModalComponent} from '../shared/add-product-modal/add-product-modal.component';
import {ToastService} from '../_services/toast.service';
import {Category} from '../_models/Category.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  categories: Array<Category>;
  products: Array<Product>;
  loading = false;

  constructor(private state: StateService, private modal: ModalController, private toast: ToastService) {
    this.state.categories$.subscribe(categories => {
      this.categories = categories;
      console.log('categories', categories);
    });
    this.state.products$.subscribe(products => {
      this.products = products;
      console.log('products', products);
    });
  }

  async openAddProductModal() {
    const modal = await this.modal.create({
      component: AddProductModalComponent,
    });

    modal.present();
  }

  remove(uuid: string) {
    this.toast.show('Usunięto produkt');
    this.state.removeProduct(uuid);
  }
}
