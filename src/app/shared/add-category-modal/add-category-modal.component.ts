import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IonModal, ModalController} from "@ionic/angular";
import {StateService} from "../../_services/state.service";
import {Category} from "../../_models/Category.model";
import {ToastService} from "../../_services/toast.service";
import {Product} from "../../_models/Product.model";

@Component({
  selector: 'app-add-category-modal',
  templateUrl: './add-category-modal.component.html',
  styleUrls: ['./add-category-modal.component.scss'],
})
export class AddCategoryModalComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  @Input() category: Category;

  name = '';
  description = '';
  notifyDays: number = 7;


  constructor(
    private modalCtrl: ModalController,
    private state: StateService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    console.log('category::', this.category);
    if(this.category) {
      this.name = this.category.name;
      this.description = this.category.description;
      this.notifyDays = this.category.notifyDays;
    }
  }

  cancel() {
    return this.modalCtrl.dismiss();
  }

  confirm() {
    const category = new Category({
      name: this.name,
      description: this.description,
      notifyDays: this.notifyDays
    });

    if(this.category) {
      this.category.name = this.name;
      this.category.description = this.description;
      this.category.notifyDays = this.notifyDays;
      this.state.editCategory(this.category).then(() => {
        this.toast.show('Edytowano kategorię');
        return this.modalCtrl.dismiss();
      });
    } else {
      this.state.addCategory(category).then(() => {
        this.toast.show('Dodano kategorię');
        return this.modalCtrl.dismiss();
      });
    }

  }

  changeName(e) {
    this.name = e.target.value;
  }

  changeDesc(e) {
    this.description = e.target.value;
  }

  changeNotifyDays(e) {
   this.notifyDays = e.target.value;
  }
}
