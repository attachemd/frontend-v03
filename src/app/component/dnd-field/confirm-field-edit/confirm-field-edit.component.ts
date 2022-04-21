import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DndFieldService } from 'src/app/services/dnd-field/dnd-field.service';

@Component({
  selector: 'app-confirm-field-edit',
  templateUrl: './confirm-field-edit.component.html',
  styleUrls: ['./confirm-field-edit.component.scss'],
})
export class ConfirmFieldEditComponent implements OnInit {
  @Input()
  public field!: any;

  @Input()
  public group!: FormGroup;

  constructor(private _dndFieldService: DndFieldService) {}

  ngOnInit(): void {
    console.log('ConfirmFieldEditComponent');
  }

  public onFieldEditSaved() {
    this._dndFieldService.setActionAndField$({
      action: 'save',
      fieldElement: this.field,
    });
  }

  public onFieldEditCanceled() {
    this._dndFieldService.setActionAndField$({
      action: 'cancel',
      fieldElement: this.field,
    });
  }
}
