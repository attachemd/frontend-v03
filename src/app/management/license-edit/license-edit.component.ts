import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-license-edit',
  templateUrl: './license-edit.component.html',
  styleUrls: ['./license-edit.component.scss'],
})
export class LicenseEditComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('history.state');
    console.log(history.state);
  }
}
