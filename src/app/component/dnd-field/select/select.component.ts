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
  constructor(
    private _dndFieldService: DndFieldService,
    private _fb: FormBuilder
  ) {}

  @HostBinding('class.ongoing') public get isOngoing() {
    return this.field.isOngoing;
  }

  public get formElement() {
    return this.group.get('form_element_fields')?.get(this.index.toString());
    // return this.formElement;
  }

  public get options() {
    return this.formElement?.get('form_element_options') as FormArray;
    // return this.options;
  }

  ngOnInit(): void {
    console.log('SelectComponent');
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
    optionFormGroup.addControl('state', this._fb.control('new', []));
    this.options.push(optionFormGroup);
  }

  public deleteOption(index: number) {
    let option = this.options.get(index.toString())?.value;

    if (option.state === 'old')
      this._dndFieldService.setDeletedOptionId$(option.id);
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
