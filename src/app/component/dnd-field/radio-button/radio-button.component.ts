import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
})
export class RadioButtonComponent implements OnInit {
  public field!: any;
  public group!: FormGroup;
  constructor() {}

  ngOnInit(): void {
    console.log('RadioButtonComponent');
    console.log('this.field');
    console.log(this.field);
  }
}
