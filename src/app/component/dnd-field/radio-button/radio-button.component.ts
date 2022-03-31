import { Component, HostBinding, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LicenseEditService } from 'src/app/services/licenses/license-edit.service';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
})
export class RadioButtonComponent implements OnInit {
  @HostBinding('class.ongoing')
  public isOngoing: boolean = false;

  public field!: any;
  public group!: FormGroup;
  constructor(private _licenseEditService: LicenseEditService) {}

  ngOnInit(): void {
    console.log('RadioButtonComponent');
    this.isOngoing = this.field.isOngoing;
    console.log('this.field');
    console.log(this.field);
  }

  public onFieldNameChanged() {
    let parmtr = 'new parameter from dnd-field ' + this.field.name;

    this._licenseEditService.setFieldName$(parmtr, this.field);
    // this.fieldChange.emit(parmtr);
  }

  public onFieldCanceled() {
    this._licenseEditService.setFieldName$('cancel', this.field);
    // this.fieldChange.emit(parmtr);
  }
}
