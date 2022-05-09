import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DndFieldService } from 'src/app/services/dnd-field/dnd-field.service';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit, OnDestroy {
  public field: any = {};
  public group!: FormGroup;
  public index!: number;
  public data!: any;
  public visibility = 'none';
  public options: any;
  public formElement: any;
  public isControlsAdded = false;

  private _subs = new Subscription();

  constructor(
    private _dndFieldService: DndFieldService,
    private _fb: FormBuilder
  ) {
    console.log(
      '%c CheckboxComponent constructor',
      'background: red; color: #fff; padding: 0 20px; border: 0px solid #47C0BE; width: 100%; font-weight: bold; font-size: 13px;'
    );
    console.log('this.isControlsAdded');
    console.log(this.isControlsAdded);
  }

  @HostBinding('class.ongoing') public get isOngoing() {
    return this.field.isOngoing;
  }

  ngOnInit() {
    console.log(
      '%c CheckboxComponent ',
      'background: red; color: #fff; padding: 0 20px; border: 0px solid #47C0BE; width: 100%; font-weight: bold; font-size: 13px;'
    );
    this.formElement = (this.group.controls['form_element_fields'] as FormArray)
      .controls[this.index] as FormGroup;
    this.options = this.formElement?.controls[
      'form_element_list_values'
    ] as FormArray;

    this._subs.add(
      this.options?.valueChanges.subscribe((value: any) => {
        console.log(value);
        let selectedOptions = this.formElement.get(
          'selected_options'
        ) as FormGroup;

        selectedOptions ??
          this.formElement.addControl('selected_options', this._fb.group({}));

        this.options.value.forEach((formElementListValue: any) => {
          console.log('formElementListValue');
          console.log(formElementListValue);

          selectedOptions.addControl(
            formElementListValue.name,
            this._fb.control(false, this._dndFieldService.bindValidations([]))
          );
        });
        this.isControlsAdded = true;
        console.log('this.isControlsAdded');
        console.log(this.isControlsAdded);
      })
    );
  }

  public log(val: any) {
    // console.log('from RadioButtonComponent');

    console.log(val);
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
    // this.field.form_element_list_values = this.options.value;
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

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }
}
