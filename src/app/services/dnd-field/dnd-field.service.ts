import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { FieldConfig, ActionAndField, Validation } from './field.model';

@Injectable({
  providedIn: 'root',
})
export class DndFieldService {
  public data: { [k: string]: any } = {
    // validations: [
    //   {
    //     name: 'required',
    //     validator: Validators.required,
    //     message: 'Option name Required',
    //   },
    //   {
    //     name: 'pattern',
    //     validator: Validators.pattern(
    //       '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'
    //     ),
    //     message: 'Invalid option name',
    //   },
    //   {
    //     name: 'custom',
    //     validator: _isduplicate,
    //     message: 'Invalid option name',
    //   },
    // ],
    validations: [
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
      //   name: 'duplicate',
      //   // validator: this._isduplicate,
      //   message: 'duplicate option name',
      // },
    ],
    // options: [
    //   {
    //     name: 'option 04',
    //   },
    //   { name: 'option 04' },
    //   { name: 'option 05' },
    // ],
    options: [
      {
        name: 'johnx',
      },
      { name: 'johny' },
      { name: 'johnyz' },
      { name: 'johnm' },
    ],
  };

  /**
   * used for (confirm field edit) communications.
   */
  private _actionAndField$ = new ReplaySubject<ActionAndField>(1);

  private _stopDrag$ = new Subject<boolean>();
  private _updateControls$ = new Subject<void>();
  private _fieldEditMode$ = new ReplaySubject<boolean>(1);
  private _deleteField$ = new Subject<any>();
  private _dndMode$ = new ReplaySubject<boolean>(1);
  private _dndFieldEditVisibility$ = new ReplaySubject<boolean>(1);

  constructor(private _fb: FormBuilder) {}

  public setActionAndField$(actionAndField: ActionAndField) {
    this._actionAndField$.next(actionAndField);
  }

  public getActionAndField$(): ReplaySubject<ActionAndField> {
    return this._actionAndField$;
  }

  public setStopDrag$(stopDrag: boolean) {
    this._stopDrag$.next(stopDrag);
  }

  public getStopDrag$(): Subject<boolean> {
    return this._stopDrag$;
  }

  public setUpdateControls$() {
    this._updateControls$.next();
  }

  public getUpdateControls$(): Subject<void> {
    return this._updateControls$;
  }

  public setFieldEditMode$(isfieldEditMode: boolean) {
    this._fieldEditMode$.next(isfieldEditMode);
  }

  public getFieldEditMode$(): ReplaySubject<boolean> {
    return this._fieldEditMode$;
  }

  public setDeleteField$(field: any) {
    this._deleteField$.next(field);
  }

  public getDeleteField$(): Subject<any> {
    return this._deleteField$;
  }

  public setDndMode$(isOnDndMode: boolean) {
    this._dndMode$.next(isOnDndMode);
  }

  public getDndMode$(): ReplaySubject<boolean> {
    return this._dndMode$;
  }

  public setDndFieldEditVisibility$(isDndFieldEditVisible: boolean) {
    this._dndFieldEditVisibility$.next(isDndFieldEditVisible);
  }

  public getDndFieldEditVisibility$(): ReplaySubject<boolean> {
    return this._dndFieldEditVisibility$;
  }

  public toggleEditVisibility(event: any, visibility: string) {
    // event.target.querySelector('button').style.display = visibility;
    event.target
      .querySelectorAll('button')
      .forEach((el: any) => (el.style.display = visibility));
  }

  public generatedFieldName(field: FieldConfig, prefix?: string) {
    return (
      field.name.split(' ').join('_').toLowerCase().trim() +
      (prefix ?? '') +
      field.id
    );
  }

  public bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList: any[] = [];

      validations.forEach((validation: Validation) => {
        if (validation.name === 'required') validList.push(Validators.required);
        else if (validation.name === 'pattern')
          validList.push(Validators.pattern(validation.pattern));
        else if (validation.name === 'duplicated')
          validList.push(this._isDuplicate);
        // else if (validation.name === 'duplicate')
        //   validList.push(
        //     DuplicateValidator.createValidator(this._duplicateService)
        //   );
      });
      return Validators.compose(validList);
    }
    return null;
  }

  public addControls2(formGroup: FormGroup, renderedBuilderFields: any) {
    // let optionsControl = <FormArray>formGroup.controls['options'];
    // (
    //   (formGroup.get('single_selection_editor') as FormGroup)?.controls[
    //     'options'
    //   ] as FormArray
    // )?.clear();
    // formGroup = this._fb.group({});
    // console.log(
    //   '%c formGroup.removeControl ',
    //   'background-color: #CDDC2B; color: #000; padding: 5px 20px; border: 0px solid #47C0BE'
    // );

    // Object.keys(formGroup.controls).forEach((key) => {
    //   console.log('key');
    //   console.log(key);

    //   // console.log('formGroup.controls[key]');
    //   // console.log(formGroup.controls[key]);
    //   formGroup.removeControl(key);
    // });
    // console.log("formGroup.value['single_selection_editor17']?.options");
    // console.log(formGroup.controls);

    // if (formGroup.value['single_selection_editor17']?.options)
    //   formGroup.value['single_selection_editor17'].options.forEach(
    //     (item: any) => {
    //       console.log('item');
    //       console.log(item);
    //     }
    //   );
    // console.log('formGroup');
    // console.log(formGroup);

    // formGroup.removeControl('single_selection_editor');
    // formGroup.removeControl(this.generatedFieldName(field, '_editor'));
    // formGroup = this._fb.group({});
    // optionsControl.clear();

    // optionsControl = this._setOptions(this._data.options);
    // this._data.cities.forEach((x) => {
    //   optionsControl.push(
    //     this._fb.group({
    //       city: x.city,
    //       options: this._setOptions(x),
    //     })
    //   );
    // });

    // this._data.options.forEach((x) => {
    //   let optionFormGroup = this._fb.group(
    //     {},
    //     {
    //       validators: Validators.compose([this._isDuplicate]),
    //     }
    //   );
    //   const control = this._fb.control(
    //     x.name,
    //     this._bindValidations(this._data.validations || [])
    //   );

    //   optionFormGroup.addControl('name', control);
    //   optionsControl.push(optionFormGroup);
    // });

    // this._controlLicenseNumber(formGroup);

    // console.log('_controlLicenseNumber');
    // console.log(this._controlLicenseNumber(formGroup));

    // this._data.options.forEach((x) => {
    //   let optionFormGroup = this._fb.group({});
    //   let control = new FormControl();

    //   control.setValue(x.name);
    //   control.setValidators(
    //     this._bindValidations(this._data.validations || [])
    //   );

    //   optionFormGroup.addControl('name', control);
    //   optionsControl.push(optionFormGroup);
    // });

    // formGroup = this._fb.group(
    //   {
    //     name: ['', [Validators.required]],
    //     surname: ['', [Validators.required]],
    //     phone: ['', [Validators.required]],
    //     nationality: ['', [Validators.required]],
    //     email: ['', Validators.email],
    //     license_number: ['', [Validators.required]],
    //   },
    //   {
    //     validator: this._controlLicenseNumber,
    //   }
    // );

    renderedBuilderFields.forEach((field: any) => {
      if (field.type === 'button') return;
      if (field.type === 'date') field.value = new Date(field.value);
      // if (field.type === 'radiobutton') {
      //   console.log('field label');
      //   console.log(field.label.split(' ').join('_').toLowerCase().trim());

      //   let optionsFormGroup = this._fb.group({});
      //   let optionsControl = this._fb.array([]);

      //   this.data.options.forEach((x) => {
      //     let optionFormGroup = this._fb.group(
      //       {},
      //       {
      //         validators: Validators.compose([this._isDuplicate]),
      //       }
      //     );
      //     const control = this._fb.control(
      //       x.name,
      //       this._bindValidations(this.data.validations || [])
      //     );

      //     optionFormGroup.addControl('name', control);
      //     optionsControl.push(optionFormGroup);
      //   });
      //   optionsFormGroup.addControl('options', optionsControl);
      //   formGroup.addControl(
      //     // field.label.split(' ').join('_').toLowerCase().trim(),
      //     field.name + '_editor',
      //     optionsFormGroup
      //   );
      //   // return;
      // }

      // BOOKMARK RADIOBUTTON
      if (field.type === 'radiobutton') {
        console.log(
          '%c radiobutton ',
          'background-color: #F7C73B; color: #000; padding: 5px 20px; border: 0px solid #47C0BE'
        );

        // let control = <FormArray>this.myForm.controls['single_selections'];

        // control.push(
        //   this._fb.group({
        //     single_selection: field.name,
        //     options: this._setOtions(this._data),
        //   })
        // );

        // return;

        let optionsFormGroup = this._fb.group({});
        let optionsControl = this._fb.array([]);

        // console.log(
        //   '%c RADIOBUTTON ',
        //   'background: #555a60; color: #f2c080; padding: 10px 20px; border: 0px solid #47C0BE; width: 100%; font-weight: bold; font-size: 13px;'
        // );

        // if (this.data[this.generatedFieldName(field, '_editor')])
        //   this.data[this.generatedFieldName(field, '_editor')][
        //     'options'
        //   ].forEach((item: any) => {
        //     console.log('item');
        //     console.log(item);
        //   });
        // let fieldOptions =
        //   this.data[this.generatedFieldName(field, '_editor')]?.options;

        // console.log("this.generatedFieldName(field, '_editor')");
        // console.log(this.generatedFieldName(field, '_editor'));
        // console.log('fieldOptions');
        // console.log(fieldOptions);
        // console.log("this.data['options']");
        // console.log(this.data['options']);

        // let newData: any = (this.data[
        //   this.generatedFieldName(field, '_editor') as keyof typeof this.data
        // ] = {});

        // newData['options'] = fieldOptions ?? [...this.data['options']];

        let options = formGroup.get(this.generatedFieldName(field, '_editor'))
          ?.value.options ?? [...this.data['options']];

        options.forEach((x: any) => {
          let optionFormGroup = this._fb.group(
            {}
            // {
            //   validators: Validators.compose([this._isDuplicate]),
            //   // validators: Validators.compose([]),
            // }
          );

          const control = this._fb.control(
            x.name,
            this.bindValidations(this.data['validations'] || [])
          );

          optionFormGroup.addControl('name', control);
          optionsControl.push(optionFormGroup);
        });
        optionsFormGroup.addControl('options', optionsControl);

        formGroup.addControl(
          this.generatedFieldName(field, '_editor'),
          optionsFormGroup
        );
        // return;
      }

      const control = this._fb.control(
        field.value,
        this.bindValidations(field.validations || [])
      );

      formGroup.addControl(this.generatedFieldName(field), control);
    });
    // this.singles = (
    //   (formGroup.get('single_selection_editor') as FormGroup)?.controls[
    //     'options'
    //   ] as FormArray
    // )?.controls;

    // console.log('singles');
    // console.log(this.singles);
  }

  // BOOKMARK add control
  public addControls(formGroup: FormGroup, formElementFields: any) {
    // delete all form controls
    Object.keys(formGroup.controls).forEach((key) => {
      formGroup.removeControl(key);
    });

    // create form name (form control)
    formGroup.addControl(
      'name',
      this._fb.control('the form2', this.bindValidations([]))
    );

    // create form_element_fields (form array)
    formGroup.addControl('form_element_fields', this._fb.array([]));
    let formElementFieldsControl = <FormArray>(
      formGroup.controls['form_element_fields']
    );

    formElementFields.forEach((formElementField: any) => {
      console.log(
        '%c formElementField ',
        'background: #ffa600; color: #000; padding: 10px 20px; border: 0px solid #47C0BE; width: 100%; font-weight: bold; font-size: 13px;'
      );
      console.log(formElementField);

      let elementTemplate = formElementField.form_element_template;
      let formElementFieldGroup = this._fb.group({});

      // create field name (form control)
      formElementFieldGroup.addControl(
        'id',
        this._fb.control(formElementField.id, this.bindValidations([]))
      );

      // create field name (form control)
      formElementFieldGroup.addControl(
        'name',
        this._fb.control(formElementField.name, this.bindValidations([]))
      );

      // create form_element_template (form group)
      formElementFieldGroup.addControl(
        'form_element_template',
        this._fb.group({
          id: this._fb.control(elementTemplate.id, this.bindValidations([])),
        })
      );

      if (elementTemplate.form_element_type.name === 'radiobutton') {
        let formElementListValuesControl = this._fb.array([]);
        // let formElementFieldGroup = this._fb.group({
        //   form_element_list_values: formElementListValuesControl,
        // });

        // create field form_element_list_values (form array)
        formElementFieldGroup.addControl(
          'form_element_list_values',
          formElementListValuesControl
        );

        // create field selected_option (form control)
        formElementFieldGroup.addControl(
          'selected_option',
          this._fb.control('', this.bindValidations([]))
        );

        // create form_element_list_values (form array)
        formElementField.form_element_list_values.forEach(
          (formElementListValue: any) => {
            let formElementListValueGroup = this._fb.group({});

            console.log('formElementListValue.name');
            console.log(formElementListValue.name);

            const control = this._fb.control(
              formElementListValue.name,
              this.bindValidations(this.data['validations'] || [])
            );

            formElementListValueGroup.addControl('name', control);
            formElementListValuesControl.push(formElementListValueGroup);
          }
        );

        // const control = this._fb.control(
        //   field.value,
        //   this.bindValidations(field.validations || [])
        // );

        // formGroup.addControl(this.generatedFieldName(field), control);

        // formElementListValuesGroup.addControl(
        //   'form_element_list_values',
        //   formElementListValuesControl
        // );

        // formGroup.addControl('form_element_fields', formElementListValuesGroup);
        // formElementFieldsControl.push(formElementListValuesControl);
      } else if (elementTemplate.form_element_type.name === 'input')
        // create field selected_option (form control)
        formElementFieldGroup.addControl(
          'tika',
          this._fb.control('', this.bindValidations([]))
        );

      formElementFieldsControl.push(formElementFieldGroup);
    });
    console.log('formGroup');
    console.log(formGroup);
  }

  public deleteFieldControl(group: FormGroup, field: any) {
    group.removeControl(this.generatedFieldName(field, '_editor'));
    group.removeControl(this.generatedFieldName(field));
  }

  private _isDuplicate(control: AbstractControl) {
    setTimeout(() => {
      // console.log(
      //   '%c duplicated top ',
      //   'background-color: green; color: #fff; padding: 0 200px; border: 0px solid #47C0BE'
      // );
      // return null;
      let options = control.parent?.parent?.value;
      let opt = control.parent?.parent as FormArray;
      // let options = control.parent?.value;

      // console.log("formGroup.get('single_selection_editor')?.errors");
      // console.log(control.parent?.parent?.parent?.errors);

      // console.log('control');
      // console.log(control.value);
      // console.log('control.errors');
      // console.log(control.errors);
      // console.log('control.parent?.parent');
      // console.log(control.parent?.parent);

      // console.log('control: ');
      // console.log(control);
      // console.log('options: ');
      // console.log(options);

      // return { invalidUrl: true };
      // const valueArr = this.myForm.get('options')?.value;
      let names = options?.map((item: any) => {
        return item['name'];
      });

      // console.log('control.parent?.parent?.controls');
      // console.log(control.parent?.parent?.controls);
      // if (opt) console.log('--------------------------');
      // console.log(
      //   '%c -------------------------- ',
      //   'background-color: yellow; color: #000; padding: 0 200px; border: 0px solid #47C0BE'
      // );

      function getOccurrence(array: any, value: any) {
        var count = 0;

        array.forEach((v: any) => v.name === value && count++);
        return count;
      }
      function removeItemOnce(arr: any, value: any) {
        var index = arr.indexOf(value);

        if (index > -1) arr.splice(index, 1);

        return arr;
      }
      // let filteredArray = opt.value.filter(
      //   (e: any) => e.name !== control.value
      // );

      // let filteredArray = removeItemOnce(opt.value);

      // console.log('filteredArray');
      // console.log(filteredArray);

      // let found = filteredArray.find((x: any) => x.name === control.value);

      // console.log('control.value');
      // console.log(control.value);

      // console.log('found');
      // console.log(found);

      // let count = getOccurrence(opt.value, control.value);

      // console.log('count === 1');
      // console.log(count === 1);

      opt['controls'].forEach((item: any) => {
        // console.log('item.controls.name.value: ');
        // console.log(item.controls.name.value);
        // console.log('item.controls.name.errors: ');
        // console.log(item.controls.name.errors);
        // console.log("item.controls.name.hasError('duplicated')");
        // console.log(item.controls.name.hasError('duplicated'));
        let count = getOccurrence(opt.value, item.controls.name.value);

        // console.log('count === 1');
        // console.log(count === 1);

        // if (found !== undefined) control.setErrors({ duplicated: true });
        // if (item.controls.name.hasError('duplicated'))
        //   item.controls.name.setErrors(null);
        // control.setErrors({ duplicated: true });
        if (!item.controls.name.errors)
          if (count === 1) item.controls.name.setErrors(null);
          else item.controls.name.setErrors({ duplicated: true });
        else if (item.controls.name.hasError('duplicated') && count === 1)
          item.controls.name.setErrors(null);

        // console.log("item.controls.name.hasError('duplicated')");
        // console.log(item.controls.name.hasError('duplicated'));
      });

      // if (opt)
      //   for (let controlItem of opt['controls']) {
      //     console.log('controlItem');
      //     console.log(controlItem);
      //     controlItem.setErrors(null);
      //   }

      // if (control.parent?.parent)
      //   for (let controlItem of control.parent?.parent.controls) {
      //   }

      if (names) {
        let isDuplicate = new Set(names).size !== names.length;

        // console.log(
        //   '%c duplicated ',
        //   'background: red; color: #fff; padding: 0 200px; border: 0px solid #47C0BE'
        // );
        // console.log('names');
        // console.log(names);

        // console.log('isDuplicate');
        // console.log(isDuplicate);

        // if (isDuplicate) return { invalidUrl: true };
        // console.log('control.errors');
        // console.log(control.errors);

        // return control.setErrors(null);
        // if (isDuplicate) control.setErrors({ duplicated: true });
      }
      // console.log('hasError');
      // if (control.errors) console.log(control.errors);
      // else console.log('null');

      // return control.setErrors(null);

      // if (control.hasError('duplicated')) {
      //   console.log(
      //     '%c control ',
      //     'background: yellow; color: #fff; padding: 0 200px; border: 0px solid #47C0BE'
      //   );

      //   return control.setErrors(null);
      // }
      // return null;
      // return control.setErrors(null);
    }, 0);
  }
}
