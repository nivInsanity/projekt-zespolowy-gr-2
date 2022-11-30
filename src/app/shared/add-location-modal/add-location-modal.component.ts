import {Component, OnInit, ViewChild} from '@angular/core';
import {IonModal, ModalController} from "@ionic/angular";
import {StateService} from "../../_services/state.service";
import {Location} from "../../_models/Location.model";

@Component({
  selector: 'app-add-location-modal',
  templateUrl: './add-location-modal.component.html',
  styleUrls: ['./add-location-modal.component.scss'],
})
export class AddLocationModalComponent implements OnInit {
  location: Location = new Location();

  constructor(private modal: ModalController, private state: StateService) { }

  ngOnInit() {}

  handleChangeName(e) {
    this.location.name = e.target.value;
  }

  confirm() {
    this.state.addLocation(this.location);
    this.modal.dismiss();
  }

  cancel() {
    return this.modal.dismiss();
  }
}
