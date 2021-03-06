import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { DndFieldService } from 'src/app/services/dnd-field/dnd-field.service';
import { FieldConfig } from 'src/app/services/dnd-field/field.model';

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

  @Input()
  public index!: number;

  public options: any;

  constructor(private _dndFieldService: DndFieldService) {}

  ngOnInit(): void {
    console.log('ConfirmFieldEditComponent');
    this.options = this.group
      .get('form_element_fields')
      ?.get(this.index.toString())
      ?.get('form_element_options') as FormArray;
    // console.log('this.options');
    // console.log(this.options?.valid);
  }

  public generatedFieldName(field: FieldConfig, prefix?: any) {
    return this._dndFieldService.generatedFieldName(field, prefix);
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
