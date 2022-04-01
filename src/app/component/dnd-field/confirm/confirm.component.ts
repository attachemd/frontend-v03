import { Component, Input, OnInit } from '@angular/core';
import { LicenseEditService } from 'src/app/services/licenses/license-edit.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
  @Input()
  public field!: any;

  constructor(private _licenseEditService: LicenseEditService) {}

  ngOnInit(): void {
    console.log('ConfirmComponent');
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
