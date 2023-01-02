import { Component, OnInit } from '@angular/core';
import {Product} from "../_models/Product.model";
import {StateService} from "../_services/state.service";
import {ToastService} from "../_services/toast.service";
import {AddProductModalComponent} from "../shared/add-product-modal/add-product-modal.component";
import {ModalController} from "@ionic/angular";
import {Category} from "../_models/Category.model";
import {AddCategoryModalComponent} from "../shared/add-category-modal/add-category-modal.component";
import {Helpers} from "../_helpers/helpers";

@Component({
  selector: 'app-bin',
  templateUrl: './bin.page.html',
  styleUrls: ['./bin.page.scss'],
})
export class BinPage implements OnInit {
  products: Array<Product> = [];
  categories: Array<Category> = [];
  segment: string = 'products';

  constructor(private state: StateService, private toast: ToastService, private modal: ModalController, private helpers: Helpers) { }

  ngOnInit() {
    this.state.products$.subscribe(products => {
      this.products = products.filter(p => p.deleted);
    });

    this.state.categories$.subscribe(categories => {
      this.categories = categories.filter(c => c.deleted);
    });
  }

  restoreProduct(uuid: string) {
    this.state.restoreProduct(uuid);
    this.toast.show('Przywrócono produkt');
  }

  restoreCategory(uuid: string) {
    this.state.restoreCategory(uuid);
    this.toast.show('Przywrócono kategorię');
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

  async openEditCategoryModal(category: Category) {
    const modal = await this.modal.create({
      component: AddCategoryModalComponent,
      componentProps: {
        category,
        edit: true
      }
    });

    modal.present();
  }
}
