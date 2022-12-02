import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IonModal, ModalController} from "@ionic/angular";
import {StateService} from "../../_services/state.service";
import {Location} from "../../_models/Location.model";

@Component({
  selector: 'app-add-location-modal',
  templateUrl: './add-location-modal.component.html',
  styleUrls: ['./add-location-modal.component.scss'],
})
export class AddLocationModalComponent implements OnInit {
  @Input() location: Location;
  @Input() edit: boolean = false;

  constructor(private modal: ModalController, private state: StateService) {
  }

  ngOnInit() {
    if(this.location) {
      this.location = new Location(this.location); // Tworzy kopie obieku aby nie operować na oryginale
    } else {
      this.location = new Location(); // Jesli nie przekazano do komponentu lokalizacji utworz nowa - pusta
    }
  }

  handleChangeName(e) {
    this.location.name = e.target.value;
  }

  confirm() {
    if(this.edit) {
      this.state.editLocation(this.location);
    } else {
      this.state.addLocation(this.location);
    }

    this.modal.dismiss();
  }

  cancel() {
    return this.modal.dismiss();
  }

  handleChangeDefault(e) {
    this.location.default = e.target.checked;
  }
}
