import {Component, OnInit, ViewChild} from '@angular/core';
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

  name = '';
  description = '';

  constructor(
    private modalCtrl: ModalController,
    private state: StateService,
    private toast: ToastService
  ) {}

  ngOnInit() {
  }

  cancel() {
    return this.modalCtrl.dismiss();
  }

  confirm() {
    const category = new Category({
      name: this.name,
      description: this.description
    });

    this.state.addCategory(category).then(() => {
      this.toast.show('Dodano kategorię');
      return this.modalCtrl.dismiss();
    });

  }

  changeName(e) {
    this.name = e.target.value;
  }

  changeDesc(e) {
    this.description = e.target.value;
  }
}
