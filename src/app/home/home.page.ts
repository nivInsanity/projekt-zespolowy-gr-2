import {Component, OnInit} from '@angular/core';
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
export class HomePage implements OnInit {
  categories: Array<Category> = [];
  defaultCategory: Category;
  products: Array<Product> = [];
  loading = false;

  constructor(private state: StateService, private modal: ModalController, private toast: ToastService) {
  }

  ngOnInit() {
    this.state.categories$.subscribe(categories => {
      this.categories = categories;

      const defaultCategory = categories.find(cat => cat.default);
      this.defaultCategory = defaultCategory;
    });

    this.state.products$.subscribe(products => {
      this.products = products;
    });
  }

  async openAddProductModal() {
    const modal = await this.modal.create({
      component: AddProductModalComponent,
    });

    modal.present();
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

  remove(uuid: string) {
    this.toast.show('Usunięto produkt');
    this.state.removeProduct(uuid);
  }

  getExpirationDays(product: Product) {
    return Math.round(( product.validityDate.getTime() - new Date().getTime() ) / (1000 * 3600 * 24));
  }
}
