import {Component, OnInit, ViewChild} from '@angular/core';
import {IonModal, ModalController} from "@ionic/angular";
import {StateService} from "../../_services/state.service";

@Component({
  selector: 'app-add-location-modal',
  templateUrl: './add-location-modal.component.html',
  styleUrls: ['./add-location-modal.component.scss'],
})
export class AddLocationModalComponent implements OnInit {
  name: string = '';

  constructor(private modal: ModalController, private state: StateService) { }

  ngOnInit() {}

  handleChangeName(e) {
    this.name = e.target.value;
  }

  confirm() {
    // this.state.addLocation({
    //   name: this.name
    // })
  }

  cancel() {
    return this.modal.dismiss();
  }
}
