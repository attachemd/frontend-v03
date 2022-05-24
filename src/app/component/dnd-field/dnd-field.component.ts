import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DndFieldService } from 'src/app/services/dnd-field/dnd-field.service';
import { FieldConfig } from 'src/app/services/dnd-field/field.model';

@Component({
  selector: 'app-dnd-field',
  templateUrl: './dnd-field.component.html',
  styleUrls: ['./dnd-field.component.scss'],
})
export class DnDFieldComponent implements OnInit {
  @Input()
  public fields: FieldConfig[] = [];

  @Input()
  public form: any;

  public d: any;

  constructor(private _dndFieldService: DndFieldService) {}

  ngOnInit(): void {
    console.log('dnd-fieldComponent');
    // console.log('this.fieldData');
    // console.log(this.fieldData);
  }

  public trackItem(index: number, item: any) {
    // return item.trackId;
    return item.tracked_id;
  }

  public log(val: any) {
    // console.log('from RadioButtonComponent');

    console.log(val);
  }

  public myFunction(index: any) {
    console.log(
      '%c index ',
      'background: green; color: #fff; padding: 0 20px; border: 0px solid #47C0BE; width: 100%; font-weight: bold; font-size: 13px;'
    );

    console.log(index);
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
