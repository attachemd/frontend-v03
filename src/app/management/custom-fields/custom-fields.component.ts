import * as $ from 'jquery';
import * as _ from 'lodash';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import {
  FieldConfig,
  Validation,
} from 'src/app/services/dnd-field/field.model';
import { fieldConfig } from 'src/app/services/dnd-field/field.sample';
import { DndFieldService } from 'src/app/services/dnd-field/dnd-field.service';
import { ActivatedRoute, Router } from '@angular/router';
import { suggestedFields } from 'src/app/services/dnd-field/suggested-fields.sample';
import { essentialFields } from 'src/app/services/dnd-field/essential-fields.sample';

let isduplicate = (control: AbstractControl) => {
  console.log(
    '%c invalidUrl ',
    'background: red; color: #fff; padding: 0 200px; border: 0px solid #47C0BE'
  );

  return { invalidUrl: true };
  // const valueArr = this.myForm.get('options')?.value;
  // let names = valueArr.map((item: any) => {
  //   return item['name'];
  // });
  // let isDuplicate = new Set(names).size !== names.length;

  // if (!isDuplicate) return { invalidUrl: true };

  // return null;
};

let ft_lm = { formElementId: 0 };

class FormElement3 {
  public id: number;
  public tracked_id: number;
  public isOngoing = false;
  constructor(
    public name: string,
    public type: string,
    public label: string,
    public inputType: string,
    public value: string,
    public options: string[],
    public validations: Validation[]
  ) {
    this.tracked_id = ft_lm.formElementId++;
    this.id = this.tracked_id;
  }
}
class FormElement {
  public id: number;
  public tracked_id: number;
  public isOngoing = false;
  public name: string;
  public type: string;
  public label?: string;
  public inputType?: string;
  public value: string;
  public description?: string;
  public options?: string[];
  public validations: Validation[];
  constructor(field: FieldConfig) {
    this.tracked_id = ft_lm.formElementId++;
    this.id = this.tracked_id;
    this.name = field.name;
    this.type = field.type;
    this.label = field.label;
    this.inputType = field.inputType;
    this.value = field.value;
    this.description = field.description;
    this.options = field.options;
    this.validations = field.validations;
  }
}

@Component({
  selector: 'app-custom-fields',
  templateUrl: './custom-fields.component.html',
  styleUrls: ['./custom-fields.component.scss'],
})
export class CustomFieldsComponent implements OnInit, OnDestroy {
  public myForm!: FormGroup;
  public productId = '';
  public builderContainer = 'NEW_BUILDER_CONTAINER';

  public suggestedBuilderFields: any[] = [];
  public essentialBuilderFields: any[] = [];
  public renderedBuilderFields: any[] = [];
  public renderedBuilderFieldsPrevState: any[] = [];
  public stopDrag = false;

  private _subs = new Subscription();
  private _regConfig = fieldConfig;
  private _essentialFields = essentialFields;
  private _suggestedFields = suggestedFields;
  private _shadow: any;
  private _shadowInnerHTML: string = 'test';
  // private _data = {
  //   cities: [
  //     {
  //       city: 'Morocco',
  //       options: [{ name: 'option 01' }, { name: 'option 02' }],
  //     },
  //     {
  //       city: 'UAE',
  //       options: [
  //         { name: 'option 03' },
  //         { name: 'option 04' },
  //         { name: 'option 05' },
  //       ],
  //     },
  //   ],
  // };
  // BOOKMARK _data
  private _data = {
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
        validator: Validators.required,
        message: 'Name Required',
      },
      // {
      //   name: 'custom',
      //   validator: this._isduplicate,
      //   message: 'Invalid option name',
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
        name: 'john02@gmail.com',
      },
      { name: 'john@gmail.com' },
      { name: 'john03@gmail.com' },
    ],
  };

  constructor(
    private _dragulaService: DragulaService,
    private _fb: FormBuilder,
    private _cdRef: ChangeDetectorRef,
    private _dndFieldService: DndFieldService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this._essentialFields.forEach((field) => {
      this.essentialBuilderFields.push(new FormElement(field));
    });
    this._suggestedFields.forEach((field) => {
      this.suggestedBuilderFields.push(new FormElement(field));
    });

    // this._regConfig.forEach((field) => {
    //   this.renderedBuilderFields.push(new FormElement(field));
    // });

    // BOOKMARK this.myForm = this._fb.group({
    this.myForm = this._fb.group({
      form_name: ['the form'],
      options: this._fb.array([]),
    });

    this._addControls(this.myForm);

    this._subs.add(
      this._dragulaService.drag(this.builderContainer).subscribe(({ el }) => {
        this._dndFieldService.setDndFieldEditVisibility$(false);
        this.renderedBuilderFieldsPrevState = _.cloneDeep(
          this.renderedBuilderFields
        );
        // Hide (dnd field edit) from current dragged field
        let dndFieldEdit = el.querySelector(
          '.dnd-field-edit-container'
        ) as HTMLElement;

        if (dndFieldEdit) dndFieldEdit.style.display = 'none';

        // Copying the dragged element and is content in shadow
        this._shadow = el;
        this._shadowInnerHTML = el.innerHTML;
      })
    );

    this._subs.add(
      this._dragulaService
        .dragend(this.builderContainer)
        .subscribe(({ el }) => {
          this._shadow.innerHTML = this._shadowInnerHTML;
          this._updateTargetContainer();
        })
    );

    this._subs.add(
      this._dragulaService.shadow(this.builderContainer).subscribe(({ el }) => {
        el.className = 'drop-here';
        el.innerHTML = 'Drop Here';
      })
    );

    this._subs.add(
      _dragulaService
        .dropModel(this.builderContainer)
        .subscribe(({ el, target, source, sourceModel, targetModel, item }) => {
          this.stopDrag = true;
          item.isOngoing = true;
          this._dndFieldService.setFieldEditMode$(true);
          this._dndFieldService.setDndFieldEditVisibility$(false);
        })
    );
    this._subs.add(
      _dragulaService
        .removeModel(this.builderContainer)
        .subscribe(({ el, source, item, sourceModel }) => {
          this.stopDrag = false;
        })
    );
    this._dragulaService.createGroup(this.builderContainer, {
      moves: (el: any, container: any, handle: any): any => {
        if (this.stopDrag) return false;
        return true;
      },
      invalid: (el: any, handle: any) => {
        return el.classList.contains('dnd-field-edit-icon');
      },
      accepts: (el, target, source, sibling) => {
        if (
          source?.classList.contains('builder-render') &&
          target?.classList.contains('builder-render')
        )
          return true;
        else if (!source?.classList.contains('builder-source')) return false;
        else return true;
      },

      copy: (el, source) => {
        return source?.classList.contains('builder-source');
      },
      copyItem: (formElement: FormElement) => {
        return new FormElement(formElement);
      }, //Allow item to be coppied in another div
      removeOnSpill: false,
    });
  }

  ngOnInit(): void {
    // Get product id
    this._subs.add(
      this._route.params.subscribe({
        next: (params: any) => {
          this.productId = params['id'];
        },
        error: (err: any) => {
          console.log('error');
          console.log(err);
        },
      })
    );

    // Enter drag and drop mode
    this._dndFieldService.setDndFieldEditVisibility$(true);
    this._subs.add(
      this._dndFieldService.getFieldEditMode$().subscribe({
        next: (isFieldOnEditMode: boolean) => {
          if (isFieldOnEditMode)
            this.renderedBuilderFieldsPrevState = _.cloneDeep(
              this.renderedBuilderFields
            );
        },
        error: (err: any) => {
          console.log('error');
          console.log(err);
        },
      })
    );
    this._subs.add(
      this._dndFieldService.getStopDrag$().subscribe({
        next: (stopDrag: boolean) => {
          this.stopDrag = stopDrag;
        },
        error: (err: any) => {},
      })
    );

    this._subs.add(
      this._dndFieldService.getDeleteField$().subscribe({
        next: (fieldId: string) => {
          this.renderedBuilderFields = this.renderedBuilderFields.filter(
            function (el) {
              return el.id != fieldId;
            }
          );
        },
        error: (err: any) => {},
      })
    );

    this._subs.add(
      this._dndFieldService.getFieldName$().subscribe({
        next: (fieldObj: any) => {
          console.log('renderedBuilderFieldsPrevState');
          console.log(this.renderedBuilderFieldsPrevState);
          console.log('renderedBuilderFields');
          console.log(this.renderedBuilderFields);

          console.log('fieldObj.fieldElement');
          console.log(fieldObj.fieldElement);
          this.stopDrag = false;
          this._dndFieldService.setFieldEditMode$(false);
          this._dndFieldService.setDndFieldEditVisibility$(true);

          if (fieldObj.fieldName === 'cancel')
            if (this.renderedBuilderFieldsPrevState.length > 0) {
              // checking the lenght when cancel click and the field not dragged
              // the array always empty before drag
              let currentField = this.renderedBuilderFieldsPrevState.find(
                (item) => item.id === fieldObj.fieldElement.id
              );

              if (currentField) currentField.isOngoing = false;
              this.renderedBuilderFields = _.cloneDeep(
                this.renderedBuilderFieldsPrevState
              );
              this.renderedBuilderFieldsPrevState = [];
              // click cancel and nothing there (builder canvas) only the curren element
            } else this.renderedBuilderFields = [];

          if (fieldObj.fieldName === 'save') {
            // replaySubject old value (fieldObj.fieldElement) not destroyed
            // and ft_lm.formElementId give new ids for new created
            // fields then currentField may be undefined

            let currentField = this.renderedBuilderFields.find(
              (item) => item.id === fieldObj.fieldElement.id
            );

            if (currentField) {
              currentField.isOngoing = false;
              this.myForm.removeControl(currentField.name);
            }
          }

          this._updateTargetContainer();
        },
        error: (err: any) => {},
      })
    );

    let elementBuilder = $('#elem-id');

    if (elementBuilder) {
      let topPosition = elementBuilder.offset()!.top - 10;

      window.addEventListener(
        'scroll',
        () => {
          if ($('.mat-sidenav-content').scrollTop()! > topPosition)
            elementBuilder.addClass('sticky');
          else elementBuilder.removeClass('sticky');
        },
        true
      );
    }
  }

  ngOnDestroy(): void {
    this._dragulaService.destroy(this.builderContainer);
    this._subs.unsubscribe();
  }

  public onSubmit(form: FormGroup) {
    console.log(
      '%c save ',
      'background: yellow; color: #000; padding: 0 200px; border: 0px solid #47C0BE'
    );
    console.log('form.value', form.value);
    console.log('Valid?', form.valid); // true or false
    // this._router.navigate(['/products/', this.productId]);
    // this._router.navigate(['/products/', '(edit:products/2)']);
    this._router.navigate([
      '',
      {
        outlets: { primary: ['products'], edit: ['products', this.productId] },
      },
    ]);
    // this._router.navigateByUrl('/products/(edit:products/2)');
  }

  // BOOKMARK _setOptions
  private _setOptions(options: any) {
    let arr = new FormArray([]);

    options.forEach((y: any) => {
      arr.push(
        this._fb.group({
          name: y.name,
        })
      );
    });
    return arr;
  }

  // private _controlLicenseNumber(c: AbstractControl) {
  //   const value = c.get('options')?.value;

  //   return Object.keys(value).find((license_number) => c === value) || null;
  // }
  // BOOKMARK _isDuplicate
  private _isDuplicate(control: AbstractControl) {
    console.log(
      '%c invalidUrl top ',
      'background-color: green; color: #fff; padding: 0 200px; border: 0px solid #47C0BE'
    );
    // return null;
    // let options = control.parent?.parent?.value;
    let options = control.parent?.value;

    console.log('control: ');
    console.log(control);
    console.log('options: ');
    console.log(options);

    // return { invalidUrl: true };
    // const valueArr = this.myForm.get('options')?.value;
    let names = options?.map((item: any) => {
      return item['name'];
    });

    if (names) {
      let isDuplicate = new Set(names).size !== names.length;

      console.log(
        '%c invalidUrl ',
        'background: red; color: #fff; padding: 0 200px; border: 0px solid #47C0BE'
      );
      console.log('isDuplicate');
      console.log(isDuplicate);

      if (isDuplicate) return { invalidUrl: true };
    }

    return null;
  }

  private _controlLicenseNumber(formGroup: FormGroup) {
    const valueArr = formGroup.get('options')?.value;
    let isDuplicate = new Set(valueArr).size !== valueArr.length;

    console.log('isDuplicate');
    console.log(isDuplicate);
    let setSize = new Set(valueArr).size;
    let arrayLength = valueArr.length;

    console.log('setSize');
    console.log(setSize);
    console.log('arrayLength');
    console.log(arrayLength);
    let obj = Object.assign({}, ...valueArr);

    console.log('obj');
    console.log(obj);

    let names = valueArr.map((item: any) => {
      return item['name'];
    });

    console.log('names');
    console.log(names);
    let isDuplicate02 = new Set(names).size !== names.length;

    console.log('isDuplicate02');
    console.log(isDuplicate02);
    // return Object.keys(value).find((name) => c === value) || null;
  }

  // BOOKMARK _addControls
  private _addControls(formGroup: FormGroup) {
    let optionsControl = <FormArray>formGroup.controls['options'];

    optionsControl.clear();
    // optionsControl = this._setOptions(this._data.options);
    // this._data.cities.forEach((x) => {
    //   optionsControl.push(
    //     this._fb.group({
    //       city: x.city,
    //       options: this._setOptions(x),
    //     })
    //   );
    // });

    this._data.options.forEach((x) => {
      let optionFormGroup = this._fb.group(
        {},
        {
          validators: Validators.compose([this._isDuplicate]),
        }
      );
      const control = this._fb.control(
        x.name,
        this._bindValidations(this._data.validations || [])
      );

      optionFormGroup.addControl('name', control);
      optionsControl.push(optionFormGroup);
    });
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

    this.renderedBuilderFields.forEach((field) => {
      if (field.type === 'button') return;
      if (field.type === 'date') field.value = new Date(field.value);
      if (field.type === 'radiobutton') {
        console.log('field label');
        console.log(field.label.split(' ').join('_').toLowerCase().trim());

        let optionsFormGroup = this._fb.group({});
        let optionsControl = this._fb.array([]);

        this._data.options.forEach((x) => {
          let optionFormGroup = this._fb.group(
            {},
            {
              validators: Validators.compose([this._isDuplicate]),
            }
          );
          const control = this._fb.control(
            x.name,
            this._bindValidations(this._data.validations || [])
          );

          optionFormGroup.addControl('name', control);
          optionsControl.push(optionFormGroup);
        });
        optionsFormGroup.addControl('options', optionsControl);
        formGroup.addControl(
          field.label.split(' ').join('_').toLowerCase().trim(),
          optionsFormGroup
        );
        return;
      }

      const control = this._fb.control(
        field.value,
        this._bindValidations(field.validations || [])
      );

      formGroup.addControl(field.name, control);
    });
  }

  private _bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList: any[] = [];

      validations.forEach((validation: Validation) => {
        if (validation.name === 'required') validList.push(Validators.required);
        else if (validation.name === 'pattern')
          validList.push(Validators.pattern(validation.pattern));
      });
      return Validators.compose(validList);
    }
    return null;
  }

  private _updateTargetContainer() {
    // Error: Cannot find control with name
    this._addControls(this.myForm);
    // https://www.smashingmagazine.com/2012/11/writing-fast-memory-efficient-javascript/
    // https://medium.com/@Rahulx1/understanding-event-loop-call-stack-event-job-queue-in-javascript-63dcd2c71ecd
    // https://stackoverflow.com/questions/31698747/does-the-js-garbage-collector-clear-stack-memory
    setTimeout(() => {
      for (let builder_element_model of this.renderedBuilderFields)
        builder_element_model.tracked_id =
          builder_element_model.tracked_id! + 1000;

      this._cdRef.detectChanges();
    }, 0);
  }
}
