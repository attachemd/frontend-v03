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
        message: 'Option name required y',
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
  private _deletedOptionId$ = new Subject<string>();

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

  public setDeletedOptionId$(deletedOptionId: string) {
    this._deletedOptionId$.next(deletedOptionId);
  }

  public getDeletedOptionId$(): Subject<string> {
    return this._deletedOptionId$;
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

  // BKMRK add control
  public addControls(
    formGroup: FormGroup,
    formElementFields: any,
    exclude: string[] = []
  ) {
    console.log(
      '%c addControls ',
      'background: #E1342A; color: #fff; padding: 0 20px; border: 0px solid #47C0BE; width: 100%; font-weight: bold; font-size: 13px;'
    );

    exclude.push('id');
    exclude.push('product_id');

    /** delete all form controls */
    Object.keys(formGroup.controls).forEach((key) => {
      let x = exclude.find((item: any) => item === key);

      x ?? formGroup.removeControl(key);
    });

    /** create form name (form control) */
    // formGroup.addControl(
    //   'id',
    //   this._fb.control('the form2', this.bindValidations([]))
    // );
    formGroup.addControl(
      'name',
      this._fb.control('the form2', this.bindValidations([]))
    );

    /** create form_element_fields (form array) */
    formGroup.addControl('form_element_fields', this._fb.array([]));
    let formElementFieldsControl = <FormArray>(
      formGroup.get('form_element_fields')
    );

    formElementFields.forEach((formElementField: any) => {
      let elementTemplate = formElementField.form_element_template;
      let formElementFieldGroup = this._fb.group({});

      /** create field name (form control) */
      formElementFieldGroup.addControl(
        'id',
        this._fb.control(formElementField.id, this.bindValidations([]))
      );
      formElementFieldGroup.addControl(
        'sort_id',
        this._fb.control(formElementField.sort_id, this.bindValidations([]))
      );
      formElementFieldGroup.addControl(
        'state',
        this._fb.control(formElementField.state, this.bindValidations([]))
      );

      /** create field name (form control) */
      formElementFieldGroup.addControl(
        'name',
        this._fb.control(formElementField.name, this.bindValidations([]))
      );

      /** create form_element_template (form group) */
      formElementFieldGroup.addControl(
        'form_element_template',
        this._fb.group({
          id: this._fb.control(elementTemplate.id, this.bindValidations([])),
        })
      );

      // BKMRK radiobutton & select
      if (
        elementTemplate.form_element_type.name === 'radiobutton' ||
        elementTemplate.form_element_type.name === 'select'
      ) {
        // console.log('radiobutton from addControls');
        let formElementOptionsControl = this._fb.array([]);
        // let formElementFieldGroup = this._fb.group({
        //   form_element_options: formElementOptionsControl,
        // });

        /** create field form_element_options (form array) */
        formElementFieldGroup.addControl(
          'form_element_options',
          formElementOptionsControl
        );

        /** create field selected_value (form control) */
        formElementFieldGroup.addControl(
          'selected_value',
          this._fb.control(
            formElementField.selected_value?.value ?? '',
            this.bindValidations([])
          )
        );

        /** create form_element_options (form array) */
        formElementField.form_element_options.forEach(
          (formElementOption: any) => {
            let formElementOptionGroup = this._fb.group({});

            const control = this._fb.control(
              formElementOption.name,
              // this.bindValidations(this.data['validations'] || [])
              this.bindValidations(formElementField.option_validations || [])
            );

            formElementOptionGroup.addControl('name', control);
            /** create field id (form control) */
            formElementOptionGroup.addControl(
              'id',
              this._fb.control(formElementOption.id, this.bindValidations([]))
            );
            formElementOptionGroup.addControl(
              'state',
              this._fb.control(
                formElementOption.state,
                this.bindValidations([])
              )
            );
            formElementOptionsControl.push(formElementOptionGroup);
          }
        );

        // const control = this._fb.control(
        //   field.value,
        //   this.bindValidations(field.validations || [])
        // );

        // formGroup.addControl(this.generatedFieldName(field), control);

        // formElementOptionsGroup.addControl(
        //   'form_element_options',
        //   formElementOptionsControl
        // );

        // formGroup.addControl('form_element_fields', formElementOptionsGroup);
        // formElementFieldsControl.push(formElementOptionsControl);

        // BKMRK checkbox
      } else if (elementTemplate.form_element_type.name === 'checkbox') {
        // console.log('checkbox from addControls');
        console.log(
          '%c checkbox from addControls ',
          'background: black; color: #fff; padding: 0 20px; border: 0px solid #47C0BE; width: 100%; font-weight: bold; font-size: 13px;'
        );

        // let formElementFieldGroup = this._fb.group({
        //   form_element_options: formElementOptionsControl,
        // });

        /** create selected_list_values (form array) */
        // let selectedOptions = this._fb.array([]);
        let selectedListValue = this._fb.group({});

        // formElementFieldGroup.addControl(
        //   'selected_list_values',
        //   selectedOptions
        // );
        formElementFieldGroup.addControl(
          'selected_list_values',
          selectedListValue
        );
        // FIXME refactor selectedOptions
        // let selectedOptions = formElementFieldGroup.get(
        //   'selected_list_value'
        // ) as FormGroup;

        // formElementField.selected_list_values?.forEach(
        //   (selected_list_value: any) => {
        //     let selectedListValueGroup = this._fb.group({});

        //     selectedListValueGroup.addControl(
        //       'id',
        //       this._fb.control(
        //         selected_list_value.id,
        //         this.bindValidations(this.data['validations'] || [])
        //       )
        //     );
        //     selectedListValueGroup.addControl(
        //       'name',
        //       this._fb.control(
        //         selected_list_value.form_element_option.name,
        //         this.bindValidations(this.data['validations'] || [])
        //       )
        //     );
        //     selectedListValueGroup.addControl(
        //       'value',
        //       this._fb.control(
        //         /** extract true or false */
        //         selected_list_value.value.toLowerCase() === 'true',
        //         this.bindValidations(this.data['validations'] || [])
        //       )
        //     );
        //     selectedOptions.push(selectedListValueGroup);
        //   }
        // );

        /** create form_element_options (form array) */
        let formElementOptionsControl = this._fb.array([]);

        formElementFieldGroup.addControl(
          'form_element_options',
          formElementOptionsControl
        );
        let optionList =
          // formElementField.selected_list_values ??
          formElementField.form_element_options;
        // formElementField.form_element_options.forEach(

        /**
         * add new property [value] to [form element option] to use item
         * for the creation of default [selected list value]
         */
        formElementField.form_element_options.forEach((option: any) => {
          let selectedListValue = formElementField.selected_list_values?.find(
            (selected_list_value: any) => {
              return (
                option.name === selected_list_value.form_element_option.name
              );
            }
          );

          option.value = selectedListValue?.value ?? 'false';
        });

        // console.log('optionWithValues');
        // console.log(optionWithValues);

        console.log(
          '%c optionList ',
          'background: red; color: #fff; padding: 0 20px; border: 0px solid #47C0BE; width: 100%; font-weight: bold; font-size: 13px;'
        );
        console.log(optionList);
        console.log('formElementField.selected_list_values');
        console.log(formElementField.selected_list_values);
        console.log('formElementField.form_element_options');
        console.log(formElementField.form_element_options);

        optionList.forEach((option: any) => {
          // first side come from [form builder]
          // second side from [product edit]
          let optionName = option.form_element_option?.name ?? option.name;
          let optionValue = option.value ?? '';
          // let optionValue = option.selected_option_value[0]?.value ?? '';
          let optionId = option.form_element_option?.id ?? option.id;

          // console.log('option');
          // console.log(option);
          // console.log('option.selected_option_value[0].value');
          // console.log(option.selected_option_value[0]?.value);

          let formElementOptionGroup = this._fb.group({});

          formElementOptionGroup.addControl(
            'name',
            this._fb.control(
              optionName,
              // this.bindValidations(this.data['validations'] || [])
              this.bindValidations(formElementField.option_validations || [])
            )
          );
          formElementOptionGroup.addControl(
            'id',
            this._fb.control(optionId, this.bindValidations([]))
          );
          formElementOptionGroup.addControl(
            'state',
            this._fb.control(option.state, this.bindValidations([]))
          );
          selectedListValue.addControl(
            optionName,
            this._fb.control(
              optionValue.toLowerCase() === 'true',
              this.bindValidations([])
            )
          );
          formElementOptionsControl.push(formElementOptionGroup);
        });

        // const control = this._fb.control(
        //   field.value,
        //   this.bindValidations(field.validations || [])
        // );

        // formGroup.addControl(this.generatedFieldName(field), control);

        // formElementOptionsGroup.addControl(
        //   'form_element_options',
        //   formElementOptionsControl
        // );

        // formGroup.addControl('form_element_fields', formElementOptionsGroup);
        // formElementFieldsControl.push(formElementOptionsControl);

        // BKMRK date
      } else if (elementTemplate.form_element_type.name === 'date')
        formElementFieldGroup.addControl(
          // 'date',
          'selected_value',
          this._fb.control(
            formElementField.selected_value?.value ?? '',
            this.bindValidations([])
          )
        );
      // BKMRK input
      else if (elementTemplate.form_element_type.name === 'input')
        // create field selected_value (form control)

        formElementFieldGroup.addControl(
          'selected_value',
          this._fb.control(
            formElementField.selected_value?.value ?? '',
            // '',
            this.bindValidations(formElementField.validations)
          )
        );

      formElementFieldsControl.push(formElementFieldGroup);
    });

    console.log(
      '%c end of addControls ',
      'background: black; color: #fff; padding: 0 20px; border: 0px solid #47C0BE; width: 100%; font-weight: bold; font-size: 13px;'
    );
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
