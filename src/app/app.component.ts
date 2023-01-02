import {Component, OnInit} from '@angular/core';
import {StateService} from "./_services/state.service";
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private state: StateService, protected menuCtrl: MenuController) {
  }

  ngOnInit() {}
}
