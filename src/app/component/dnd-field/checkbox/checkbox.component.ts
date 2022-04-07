import { Component, HostBinding } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  public field: any = {};
  public group!: FormGroup;
  public visibility = 'none';

  constructor() {}
  @HostBinding('class.ongoing') public get isOngoing() {
    return this.field.isOngoing;
  }
}
