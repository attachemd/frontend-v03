import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LicenseEditService } from 'src/app/services/licenses/license-edit.service';

@Component({
  selector: 'app-dnd-field',
  templateUrl: './dnd-field.component.html',
  styleUrls: ['./dnd-field.component.scss'],
})
export class DnDFieldComponent implements OnInit {
  @Input()
  public type: string = 'type';

  @Input()
  public content: string = 'content from dnd field';

  @Input()
  public isOngoing = false;

  @Input()
  public RenderedBuilderFields: any;

  @Input()
  public fieldData: any = {};

  @Output()
  public fieldChange = new EventEmitter();

  public text = 'default value';
  public license = { key: 'jsdfhfdhdfshklhf' };
  constructor(private _licenseEditService: LicenseEditService) {}

  ngOnInit(): void {
    console.log('dnd-fieldComponent');
    // console.log('this.fieldData');
    // console.log(this.fieldData);
  }

  public onFieldNameChanged() {
    let parmtr = 'new parameter from dnd-field';

    this._licenseEditService.setFieldName$(parmtr, this.fieldData);
    // this.fieldChange.emit(parmtr);
  }

  public onFieldCanceled() {
    this._licenseEditService.setFieldName$('cancel', this.fieldData);
    // this.fieldChange.emit(parmtr);
  }
}
