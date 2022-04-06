import { Component, Input, OnInit } from '@angular/core';
import { DndFieldService } from 'src/app/services/dnd-field/dnd-field.service';

@Component({
  selector: 'app-confirm-field-edit',
  templateUrl: './confirm-field-edit.component.html',
  styleUrls: ['./confirm-field-edit.component.scss'],
})
export class ConfirmFieldEditComponent implements OnInit {
  @Input()
  public field!: any;

  constructor(private _dndFieldService: DndFieldService) {}

  ngOnInit(): void {
    console.log('ConfirmFieldEditComponent');
  }

  public onFieldNameChanged() {
    let parmtr = 'new parameter from dnd-field ' + this.field.name;

    this._dndFieldService.setFieldName$(parmtr, this.field);
    // this.fieldChange.emit(parmtr);
  }

  public onFieldCanceled() {
    this._dndFieldService.setFieldName$('cancel', this.field);
    // this.fieldChange.emit(parmtr);
  }
}
