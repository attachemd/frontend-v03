import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LicenseEditService } from 'src/app/services/licenses/license-edit.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Input()
  public type: string = 'success';

  @Output()
  public fieldChange = new EventEmitter();

  public text = 'default value';
  public license = { key: 'jsdfhfdhdfshklhf' };
  constructor(private _licenseEditService: LicenseEditService) {}

  ngOnInit(): void {
    console.log('AlertComponent');
  }

  public onFieldNameChanged() {
    let parmtr = 'new parameter from alert';

    this._licenseEditService.setFieldName$(parmtr);
    // this.fieldChange.emit(parmtr);
  }
}
