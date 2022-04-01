import { Component, HostBinding, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {
  @HostBinding('class.ongoing')
  public isOngoing: boolean = false;

  public field: any = {};
  public group!: FormGroup;
  constructor() {}

  ngOnInit(): void {
    console.log('CheckboxComponent');
    this.isOngoing = this.field.isOngoing;
  }
}
