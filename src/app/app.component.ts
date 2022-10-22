import {Component, OnInit} from '@angular/core';
import {StateService} from './_services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private state: StateService) {
  }

  ngOnInit() {}
}
