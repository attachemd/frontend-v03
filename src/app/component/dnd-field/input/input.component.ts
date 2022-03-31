// https://stackoverflow.com/questions/34641281/how-to-add-class-to-host-element
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LicenseEditService } from 'src/app/services/licenses/license-edit.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @HostBinding('class.ongoing')
  public isOngoing: boolean = false;

  public field: any = {};
  public group!: FormGroup;

  constructor(private _licenseEditService: LicenseEditService) {}

  ngOnInit(): void {
    console.log('InputComponent');
    this.isOngoing = this.field.isOngoing;
    console.log('this.isOngoing');
    console.log(this.isOngoing);
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
