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
  public data!: any;
  public visibility = 'none';

  public validations = [
    {
      name: 'required',
      message: 'Option name required',
    },
    {
      name: 'pattern',
      pattern: '^[a-zA-Z]+$',
      message: 'Accept only text',
    },
    {
      name: 'duplicated',
      // validator: this._isduplicate,
      message: 'The option name must be unique',
    },
    // {
    //   name: 'custom',
    //   validator: this._isduplicate,
    //   message: 'Invalid option name',
    // },
  ];

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
    console.log('RadioButtonComponent');
    console.log(
      '%c index ',
      'background: red; color: #fff; padding: 10px 20px; border: 0px solid #47C0BE; width: 100%; font-weight: bold; font-size: 13px;'
    );
    console.log(this.index);
    // const valueArr = this.group.get(
    //   this.generatedFieldName(this.field, '_editor')
    // );

    // this.group.valueChanges.subscribe({
    //   next: (form) => {
    //     // keep data model updated
    //     let generatedFieldName = this.generatedFieldName(this.field, '_editor');

    //     console.log('generatedFieldName');
    //     console.log(generatedFieldName);

    //     // if (this.data[generatedFieldName])
    //     //   this.data[generatedFieldName]['options'].forEach((item: any) => {
    //     //     console.log('item');
    //     //     console.log(item);
    //     //   });

    //     // if (form[generatedFieldName]?.options)
    //     //   // this.data.options = [...form[generatedFieldName]?.options];

    //     //   this.data[this.generatedFieldName(this.field, '_editor')].options = [
    //     //     ...form[generatedFieldName]?.options,
    //     //   ];

    //     // this.data.options = form[generatedFieldName]?.options;
    //   },
    // });
    // this.isOngoing = this.field.isOngoing;
    // console.log('this.field');
    // console.log(this.field);
    // this.options = (
    //   this.group.get(
    //     this.generatedFieldName(this.field, '_editor')
    //   ) as FormGroup
    // )?.controls['options'] as FormArray;
    let formElementFieldsControlValue = (
      this.group.controls['form_element_fields'] as FormArray
    ).value;

    let currentFormElementField = formElementFieldsControlValue.find(
      (item: any) => item.id === this.field.id
    );
    let index = formElementFieldsControlValue.indexOf(currentFormElementField);

    console.log(
      '%c index ',
      'background: #f2c080; color: #555a60; padding: 10px 20px; border: 0px solid #47C0BE; width: 100%; font-weight: bold; font-size: 13px;'
    );
    console.log(index);
    this.formElement = (this.group.controls['form_element_fields'] as FormArray)
      .controls[this.index] as FormGroup;
    this.options = this.formElement.controls[
      'form_element_options'
    ] as FormArray;
  }

  public deleteFieldControl() {
    this.group.removeControl(this.generatedFieldName(this.field, '_editor'));
    this.group.removeControl(this.generatedFieldName(this.field));
  }

  public generatedFieldName(field: FieldConfig, prefix?: any) {
    return this._dndFieldService.generatedFieldName(field, prefix);
  }

  public addOption() {
    console.log(
      '%c field ',
      'background: #f2c080; color: #555a60; padding: 10px 20px; border: 0px solid #47C0BE; width: 100%; font-weight: bold; font-size: 13px;'
    );
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
      this._dndFieldService.bindValidations(this.data['validations'] || [])
    );

    optionFormGroup.addControl('name', control);
    this.options.push(optionFormGroup);
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
