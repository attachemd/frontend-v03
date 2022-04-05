import { Component, Input, OnInit } from '@angular/core';
import { DndFieldService } from 'src/app/services/dnd-field/dnd-field.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
  @Input()
  public field!: any;

  constructor(private _dndFieldService: DndFieldService) {}

  ngOnInit(): void {
    console.log('ConfirmComponent');
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
