import { Component, HostBinding, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
})
export class RadioButtonComponent implements OnInit {
  // @HostBinding('class')
  // public readonly classList = 'dnd-host';

  // @HostBinding('class.ongoing')
  // public isOngoing: boolean = false;

  public field!: any;
  public group!: FormGroup;
  public visibility = 'none';
  constructor() {}
  @HostBinding('class.ongoing') public get isOngoing() {
    return this.field.isOngoing;
  }

  ngOnInit(): void {
    console.log('RadioButtonComponent');
    // this.isOngoing = this.field.isOngoing;
    console.log('this.field');
    console.log(this.field);
  }
}
