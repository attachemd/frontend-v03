import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FieldConfig } from 'src/app/services/dnd-field/field.model';
import { LicenseEditService } from 'src/app/services/licenses/license-edit.service';

@Component({
  selector: 'app-dnd-field',
  templateUrl: './dnd-field.component.html',
  styleUrls: ['./dnd-field.component.scss'],
})
export class DnDFieldComponent implements OnInit {
  @Input()
  public fields: FieldConfig[] = [];

  constructor(private _licenseEditService: LicenseEditService) {}

  ngOnInit(): void {
    console.log('dnd-fieldComponent');
    // console.log('this.fieldData');
    // console.log(this.fieldData);
  }

  public trackItem(index: number, item: any) {
    // return item.trackId;
    return item.tracked_id;
  }

  // public onFieldNameChanged() {
  //   let parmtr = 'new parameter from dnd-field';

  //   this._licenseEditService.setFieldName$(parmtr, this.fieldData);
  //   // this.fieldChange.emit(parmtr);
  // }

  // public onFieldCanceled() {
  //   this._licenseEditService.setFieldName$('cancel', this.fieldData);
  //   // this.fieldChange.emit(parmtr);
  // }
}
