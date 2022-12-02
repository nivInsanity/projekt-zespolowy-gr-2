import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IonModal, ModalController} from '@ionic/angular';
import {StateService} from '../../_services/state.service';
import {Category} from '../../_models/Category.model';
import {ToastService} from '../../_services/toast.service';
import {Product} from '../../_models/Product.model';
import {Location} from '../../_models/Location.model';

@Component({
  selector: 'app-add-category-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss'],
})
export class AddProductModalComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  @Input() product: Product;
  @Input() edit: boolean = false;

  expirationDays: number = 356;

  categories: Array<Category> = [];
  locations: Array<Location> = [];

  isOpenDatePicker = false;
  minDate: string = new Date().toISOString().substr(0, 10);

  constructor(
    private modalCtrl: ModalController,
    private state: StateService,
    private toast: ToastService,
  ) {
    if(this.product) {
      this.product = new Product(this.product);
    } else {
      this.product = new Product();
    }
  }

  ngOnInit() {
    this.state.categories$.subscribe(categories => {
      this.categories = categories;

      if(!this.edit) {
        const defaultCategory = this.categories.find(cat => cat.default === true);
        if(defaultCategory) {
          this.product.categoryId = defaultCategory.uuid;
        }
      }
    });

    this.state.locations$.subscribe(locations => {
      this.locations = locations;

      if(!this.edit) {
        const defaultLocation = this.locations.find(loc => loc.default === true);
        if(defaultLocation) {
          this.product.locationId = defaultLocation.uuid;
        }
      }
    });

    if(this.product.validityDate) {
      this.expirationDays = Math.round(( this.product.validityDate.getTime() - new Date().getTime() ) / (1000 * 3600 * 24));
    }
  }

  cancel() {
    return this.modalCtrl.dismiss();
  }

  confirm() {
    if(this.edit) {
      this.state.editProduct(this.product).then(() => {
        this.toast.show('Edytowano produkt');
        return this.modalCtrl.dismiss();
      });
    } else {
      this.state.addProduct(this.product).then(() => {
        this.toast.show('Dodano produkt');
        return this.modalCtrl.dismiss();
      });
    }
  }

  changeName(e) {
    this.product.name = e.target.value;
  }

  changeDesc(e) {
    this.product.description = e.target.value;
  }

  changeCategory(e) {
    this.product.categoryId = e.target.value;
  }

  changeLocation(e) {
    this.product.locationId = e.target.value;
  }

  changeDate(e) {
    const newValidityDate = new Date(e.target.value);
    const days = Math.round(( newValidityDate.getTime() - new Date().getTime() ) / (1000 * 3600 * 24));
    this.product.validityDate = newValidityDate;
    this.expirationDays = days;
    this.isOpenDatePicker = false;
  };

  changeDays(value) {
    value = Number(value);
    if(value) {
      this.expirationDays = value;
      this.product.validityDate = new Date(this.product.validityDate.setDate(new Date().getDate() + value));
    }
  }
}
