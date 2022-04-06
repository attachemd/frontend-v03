import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-field-delete',
  templateUrl: './confirm-field-delete.component.html',
  styleUrls: ['./confirm-field-delete.component.scss'],
})
export class ConfirmFieldDeleteComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('ConfirmFieldDeleteComponent');
  }
}
