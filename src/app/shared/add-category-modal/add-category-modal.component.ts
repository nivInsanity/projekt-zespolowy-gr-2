import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IonModal, ModalController} from "@ionic/angular";
import {StateService} from "../../_services/state.service";
import {Category} from "../../_models/Category.model";
import {ToastService} from "../../_services/toast.service";

@Component({
  selector: 'app-add-category-modal',
  templateUrl: './add-category-modal.component.html',
  styleUrls: ['./add-category-modal.component.scss'],
})
export class AddCategoryModalComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  @Input() category: Category;
  @Input() edit: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private state: StateService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    console.log('category::', this.category);
    if(this.category) {
      this.category = new Category(this.category);
    } else {
      this.category = new Category();
    }
  }

  cancel() {
    return this.modalCtrl.dismiss();
  }

  confirm() {
    if(this.edit) {
      this.state.editCategory(this.category).then(() => {
        this.toast.show('Edytowano kategorię');
        return this.modalCtrl.dismiss();
      });
    } else {
      this.state.addCategory(this.category).then(() => {
        this.toast.show('Dodano kategorię');
        return this.modalCtrl.dismiss();
      });
    }

  }

  handleChangeName(e) {
    this.category.name = e.target.value;
  }

  handleChangeDesc(e) {
    this.category.description = e.target.value;
  }

  handleChangeNotifyDays(e) {
   this.category.notifyDays = e.target.value;
  }

  handleChangeDefault(e) {
    this.category.default = e.target.checked;
  }
}
