import { Component, HostBinding, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { DndFieldService } from 'src/app/services/dnd-field/dnd-field.service';
import { FieldConfig } from 'src/app/services/dnd-field/field.model';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
})
export class RadioButtonComponent implements OnInit {
  // @HostBinding('class')
  // public readonly classList = 'dnd-host';

  // @HostBinding('class.ongoing')
  // public isOngoing: boolean = false;

  public field!: any;
  public group!: FormGroup;
  public index!: number;
  public visibility = 'none';

  // public validations = [
  //   {
  //     name: 'required',
  //     message: 'Option name required m',
  //   },
  //   {
  //     name: 'pattern',
  //     pattern: '^[a-zA-Z]+$',
  //     message: 'Accept only text',
  //   },
  //   {
  //     name: 'duplicated',
  //     // validator: this._isduplicate,
  //     message: 'The option name must be unique',
  //   },
  //   // {
  //   //   name: 'custom',
  //   //   validator: this._isduplicate,
  //   //   message: 'Invalid option name',
  //   // },
  // ];

  // public options: any;
  // public formElement: any;

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
    console.log('RadioButtonComponent');
    let formElementFieldsControlValue = this.group.get(
      'form_element_fields'
    )?.value;

    let currentFormElementField = formElementFieldsControlValue.find(
      (item: any) => item.id === this.field.id
    );
    let index = formElementFieldsControlValue.indexOf(currentFormElementField);
  }

  public deleteFieldControl() {
    this.group.removeControl(this.generatedFieldName(this.field, '_editor'));
    this.group.removeControl(this.generatedFieldName(this.field));
  }

  public generatedFieldName(field: FieldConfig, prefix?: any) {
    return this._dndFieldService.generatedFieldName(field, prefix);
  }

  // BKMRK add option
  public addOption() {
    console.log(
      '%c field ',
      'background: #f2c080; color: #555a60; padding: 10px 20px; border: 0px solid #47C0BE; width: 100%; font-weight: bold; font-size: 13px;'
    );
    console.log('this.field.validations');
    console.log(this.field.validations);

    console.log(this.field);
    let optionFormGroup = this._fb.group(
      {}
      // {
      //   validators: Validators.compose([this._isDuplicate]),
      //   // validators: Validators.compose([]),
      // }
    );

    const control = this._fb.control(
      '',
      // this._dndFieldService.bindValidations(this.data['validations'] || [])
      this._dndFieldService.bindValidations(this.field.option_validations || [])
    );

    optionFormGroup.addControl('name', control);
    // BKMRK option state new
    optionFormGroup.addControl('state', this._fb.control('new', []));
    this.options.push(optionFormGroup);
    console.log('optionFormGroup');
    console.log(optionFormGroup);

    console.log('this.group');
    console.log(this.group);

    // this.field.form_element_options = this.options.value;
    // return;
    // console.log('----------------');
    // console.log('data');
    // console.log(this.data);
    // console.log("this.generatedFieldName(this.field, '_editor')");
    // console.log(this.generatedFieldName(this.field, '_editor'));
    // console.log("this.data[this.generatedFieldName(this.field, '_editor')]");
    // console.log(this.data[this.generatedFieldName(this.field, '_editor')]);
    // console.log(
    //   "this.data[this.generatedFieldName(this.field, '_editor')]['options']"
    // );
    // console.log(
    //   this.data[this.generatedFieldName(this.field, '_editor')]['options']
    // );

    // this.data[this.generatedFieldName(this.field, '_editor')]['options'].push({
    //   name: '',
    // });
    // // this.data[this.generatedFieldName(this.field, '_editor')]['options2'].push({
    // //   name: '',
    // // });
    // if (this.data[this.generatedFieldName(this.field, '_editor')])
    //   this.data[this.generatedFieldName(this.field, '_editor')][
    //     'options'
    //   ].forEach((item: any) => {
    //     console.log('item');
    //     console.log(item);
    //   });
    // console.log('data');
    // console.log(this.data);
    // this._dndFieldService.setUpdateControls$();
  }

  // BKMRK delete option
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

  public log(val: any) {
    // console.log('from RadioButtonComponent');

    console.log(val);
  }

  public getFormValidationErrors(formGroup: any) {
    Object.keys(formGroup.controls).forEach((key) => {
      const controlErrors: ValidationErrors = formGroup.get(key).errors;

      console.log('nothing!');

      if (controlErrors != null)
        Object.keys(controlErrors).forEach((keyError) => {
          console.log(
            'Key control: ' + key + ', keyError: ' + keyError + ', err value: ',
            controlErrors[keyError]
          );
        });
    });
  }
}
