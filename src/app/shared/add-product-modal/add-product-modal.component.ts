import {Component, OnInit, ViewChild} from '@angular/core';
import {IonModal, ModalController} from "@ionic/angular";
import {StateService} from "../../_services/state.service";
import {Category} from "../../_models/Category.model";
import {ToastService} from "../../_services/toast.service";
import {Product} from "../../_models/Product.model";
import {AddCategoryModalComponent} from "../add-category-modal/add-category-modal.component";

@Component({
  selector: 'app-add-category-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss'],
})
export class AddProductModalComponent {
  @ViewChild(IonModal) modal: IonModal;

  name = '';
  description = '';
  categoryId = null;

  categories: Array<Category> = [];

  constructor(
    private modalCtrl: ModalController,
    private state: StateService,
    private toast: ToastService,
  ) {
    this.state.categories$.subscribe(categories => this.categories = categories);
  }

  cancel() {
    return this.modalCtrl.dismiss();
  }

  confirm() {
    const product = new Product({
      name: this.name,
      description: this.description,
      categoryId: this.categoryId
    });

    this.state.addProduct(product).then(() => {
      this.toast.show('Dodano produkt');
      return this.modalCtrl.dismiss();
    });

  }

  changeName(e) {
    this.name = e.target.value;
  }

  changeDesc(e) {
    this.description = e.target.value;
  }

  changeCategory(e) {
    this.categoryId = e.target.value;
  }
}
