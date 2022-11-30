import {Component, OnInit, ViewChild} from '@angular/core';
import {IonModal, ModalController} from '@ionic/angular';
import {StateService} from '../../_services/state.service';
import {Category} from '../../_models/Category.model';
import {ToastService} from '../../_services/toast.service';
import {Product} from '../../_models/Product.model';
import {AddCategoryModalComponent} from '../add-category-modal/add-category-modal.component';
import {isNumeric} from "rxjs/internal-compatibility";

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
  validityData = new Date();
  expirationDays: number = 7;

  categories: Array<Category> = [];

  isOpenDatePicker = false;

  constructor(
    private modalCtrl: ModalController,
    private state: StateService,
    private toast: ToastService,
  ) {
    this.state.categories$.subscribe(categories => this.categories = categories);
    this.validityData.setDate(this.validityData.getDate() + this.expirationDays);
  }

  cancel() {
    return this.modalCtrl.dismiss();
  }

  confirm() {
    const product = new Product({
      name: this.name,
      description: this.description,
      categoryId: this.categoryId,
      validityData: this.validityData
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

  changeDate(e) {
    this.validityData = new Date(e.target.value);
    this.expirationDays = Math.round(( this.validityData.getTime() - new Date().getTime() ) / (1000 * 3600 * 24));
    this.isOpenDatePicker = false;
  };

  changeDays(value) {
    value = Number(value);
    if(value) {
      this.expirationDays = value;
      this.validityData = new Date(this.validityData.setDate(new Date().getDate() + value));
      console.log('validity date',  this.validityData);
    }
  }
}
