import { Component, HostBinding, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DndFieldService } from 'src/app/services/dnd-field/dnd-field.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  public field!: any;
  public group!: FormGroup;
  public index!: number;
  public data!: any;
  public visibility = 'none';
  public options: any;
  public formElement: any;
  constructor(
    private _dndFieldService: DndFieldService,
    private _fb: FormBuilder
  ) {}

  @HostBinding('class.ongoing') public get isOngoing() {
    return this.field.isOngoing;
  }

  ngOnInit(): void {
    console.log('SelectComponent');
    this.formElement = (this.group.controls['form_element_fields'] as FormArray)
      .controls[this.index] as FormGroup;
    this.options = this.formElement.controls[
      'form_element_options'
    ] as FormArray;
  }

  public addOption() {
    console.log(
      '%c field ',
      'background: #f2c080; color: #555a60; padding: 10px 20px; border: 0px solid #47C0BE; width: 100%; font-weight: bold; font-size: 13px;'
    );
    console.log(this.field);
    let optionFormGroup = this._fb.group({});

    const control = this._fb.control(
      '',
      this._dndFieldService.bindValidations(this.data['validations'] || [])
    );

    optionFormGroup.addControl('name', control);
    this.options.push(optionFormGroup);
  }

  public deleteOption(index: number) {
    this.options.removeAt(index);
    // return;
    // console.log('index');
    // console.log(index);
    // this.data[this.generatedFieldName(this.field, '_editor')].options.splice(
    //   index,
    //   1
    // );
    // this._dndFieldService.setUpdateControls$();
  }
}
