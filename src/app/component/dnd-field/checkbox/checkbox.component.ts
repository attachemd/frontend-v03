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
  public isControlsAdded = false;

  private _subs = new Subscription();
  private _subsForOtionsValueChanges = new Subscription();

  constructor(
    private _dndFieldService: DndFieldService,
    private _fb: FormBuilder
  ) {
    console.log(
      '%c CheckboxComponent constructor',
      'background: red; color: #fff; padding: 0 20px; border: 0px solid #47C0BE; width: 100%; font-weight: bold; font-size: 13px;'
    );
    // console.log('this.isControlsAdded');
    // console.log(this.isControlsAdded);
  }

  @HostBinding('class.ongoing') public get isOngoing() {
    return this.field.isOngoing;
  }

  public get formElement() {
    return this.group
      ?.get('form_element_fields')
      ?.get(this.index.toString()) as FormGroup;
    // return this.formElement;
  }

  public get options() {
    return this.formElement?.get('form_element_options') as FormArray;
    // return this.options;
  }

  ngOnInit() {
    console.log(
      '%c CheckboxComponent ',
      'background: red; color: #fff; padding: 0 20px; border: 0px solid #47C0BE; width: 100%; font-weight: bold; font-size: 13px;'
    );
    // console.log(
    //   '%c this.group ',
    //   'background: red; color: #fff; padding: 0 20px; border: 0px solid #47C0BE; width: 100%; font-weight: bold; font-size: 13px;'
    // );
    // console.log(this.group);
    // console.log('this.options');
    // console.log(this.options);
    // let formElement = (this.group.get('form_element_fields') as FormArray)
    //   .controls[this.index] as FormGroup;
    // let options = formElement?.get('form_element_options') as FormArray;

    // console.log("formElement?.get('form_element_options')");
    // console.log(options);

    // this._subs.add(
    //   this.options.valueChanges.subscribe((value: any) => {
    //     console.log('valueChanges');
    //     console.log(value);
    //     let selectedOptions = this.formElement?.get(
    //       'selected_list_value'
    //     ) as FormGroup;

    //     selectedOptions ??
    //       this.formElement?.addControl(
    //         'selected_list_value',
    //         this._fb.group({})
    //       );

    //     this.options.value.forEach((formElementOption: any) => {
    //       console.log('formElementOption');
    //       console.log(formElementOption);

    //       selectedOptions.addControl(
    //         formElementOption.name,
    //         this._fb.control(false, this._dndFieldService.bindValidations([]))
    //       );
    //     });
    //     this.isControlsAdded = true;
    //     console.log('this.isControlsAdded');
    //     console.log(this.isControlsAdded);
    //   })
    // );
  }

  // public test() {
  //   let formElement = (this.group.get('form_element_fields') as FormArray)
  //     .controls[this.index] as FormGroup;
  //   let options = formElement?.get('form_element_options') as FormArray;

  //   // console.log(
  //   //   '%c this.group ',
  //   //   'background: red; color: #fff; padding: 0 20px; border: 0px solid #47C0BE; width: 100%; font-weight: bold; font-size: 13px;'
  //   // );
  //   // console.log(this.group);

  //   // let optionName = (this.getOptions() as any).controls[0]?.controls['name']
  //   //   .value;
  //   let optionName = (options as any)?.controls[0]?.get('name')?.value;

  //   // console.log('(this.getOptions() as any)[0]');
  //   // console.log((this.getOptions() as any).controls[0]?.controls['name'].value);
  //   // console.log("formElement.controls['selected_list_value']");
  //   // console.log(
  //   //   (formElement.controls['selected_list_value'] as FormGroup)?.contains(
  //   //     optionName
  //   //   )
  //   // );

  //   // return formElement.contains('selected_list_value');

  //   return (formElement?.get('selected_list_value') as FormGroup)?.contains(
  //     optionName
  //   );
  // }

  public getFormElement(): FormGroup {
    return (this.group.get('form_element_fields') as FormArray).controls[
      this.index
    ] as FormGroup;
  }

  public getOptions(): FormArray {
    // console.log(
    //   '%c getOptions ',
    //   'background: gray; color: #fff; padding: 0 20px; border: 0px solid #47C0BE; width: 100%; font-weight: bold; font-size: 13px;'
    // );
    // console.log(this.formElement);

    return this.formElement?.get('form_element_options') as FormArray;
  }

  public checkFormElementOptions() {
    return (
      (this.formElement?.get('form_element_options') as FormArray) ?? false
    );
  }

  public checkSelectedListValues() {
    return (
      (this.formElement?.get('selected_list_values') as FormArray) ?? false
    );
  }

  public getSelectedListValues(): FormArray {
    // console.log(
    //   '%c getOptions ',
    //   'background: gray; color: #fff; padding: 0 20px; border: 0px solid #47C0BE; width: 100%; font-weight: bold; font-size: 13px;'
    // );
    // console.log(this.formElement);
    return this.formElement?.get('selected_list_values') as FormArray;
  }

  public log(val: any) {
    // console.log('from RadioButtonComponent');

    console.log(val);
  }

  public addOption() {
    // this._subsForOtionsValueChanges.unsubscribe();
    // this._subsForOtionsValueChanges.add(
    //   this.options.valueChanges.subscribe((value: any) => {
    //     console.log('valueChanges from addOption');
    //   })
    // );

    this._subsForOtionsValueChanges.unsubscribe();
    this._subsForOtionsValueChanges = this.options.valueChanges.subscribe(
      (value: any) => {
        console.log('valueChanges from addOption');
        console.log('valueChanges');
        console.log(value);
        let selectedOptions = this.formElement?.get(
          'selected_list_values'
        ) as FormGroup;

        selectedOptions ??
          this.formElement?.addControl(
            'selected_list_values',
            this._fb.group({})
          );

        this.options.value.forEach((formElementOption: any) => {
          console.log('formElementOption');
          console.log(formElementOption);

          selectedOptions.addControl(
            formElementOption.name,
            this._fb.control(false, this._dndFieldService.bindValidations([]))
          );
        });
        this.isControlsAdded = true;
        console.log('this.isControlsAdded');
        console.log(this.isControlsAdded);
      }
    );

    // console.log(
    //   '%c field ',
    //   'background: #f2c080; color: #555a60; padding: 10px 20px; border: 0px solid #47C0BE; width: 100%; font-weight: bold; font-size: 13px;'
    // );
    // console.log('this.field');
    // console.log(this.field);
    // console.log('this.group');
    // console.log(this.group);
    let optionFormGroup = this._fb.group(
      {}
      // {
      //   validators: Validators.compose([this._isDuplicate]),
      //   // validators: Validators.compose([]),
      // }
    );

    const control = this._fb.control(
      '',
      this._dndFieldService.bindValidations(this.field.option_validations || [])
    );

    optionFormGroup.addControl('name', control);
    optionFormGroup.addControl('state', this._fb.control('new', []));

    this.options.push(optionFormGroup);
    // for valuechanges
    this.options.controls[0]
      ?.get('state')
      ?.setValue(this.options.controls[0]?.get('state')?.value);
    // console.log('this.options');
    // console.log(this.options);
    // console.log('this.group');
    // console.log(this.group);

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

  ngOnDestroy(): void {
    console.log(
      '%c ngOnDestroy ',
      'background: #2187BF; color: #fff; padding: 0 20px; border: 0px solid #47C0BE; width: 100%; font-weight: bold; font-size: 13px;'
    );

    this._subs.unsubscribe();
    this._subsForOtionsValueChanges.unsubscribe();
  }
}
