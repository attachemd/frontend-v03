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
  ActionAndField,
  FieldConfig,
  Validation,
} from 'src/app/services/dnd-field/field.model';
import { fieldConfig } from 'src/app/services/dnd-field/field.sample';
import { DndFieldService } from 'src/app/services/dnd-field/dnd-field.service';
import { ActivatedRoute, Router } from '@angular/router';
import { suggestedFields } from 'src/app/services/dnd-field/suggested-fields.sample';
import { essentialFields } from 'src/app/services/dnd-field/essential-fields.sample';
import { DuplicateValidator } from 'src/app/common/errors/duplicate.validator';
import { DuplicateService } from 'src/app/common/errors/duplicate.service';
import { FormService } from 'src/app/services/forms/form.service';
import { Form } from 'src/app/services/forms/form.model';

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
class FormElement2 {
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
  constructor(field: any) {
    let fieldItem = field.form_element_template;

    this.tracked_id = ft_lm.formElementId++;
    this.id = Number(fieldItem.form_element_template_id);
    this.name = fieldItem.name;
    this.type = fieldItem.form_element_type.name;
    this.label = field.label;
    // FIXME remove inputType
    this.inputType = fieldItem.name;
    this.value = '';
    this.description = fieldItem.description;
    this.options = [];
    this.validations = fieldItem.validations;
  }
}

// BOOKMARK FormElement3
// in builder we don't need validation for the form element field
// we need it in the creation of the form element template
class FormElement3 {
  public name?: string;
  public id: number;
  public form_element_template: any;
  public form_element_list_values: any;
  public tracked_id: number;
  public isOngoing = false;
  // public name: string;
  // public type: string;
  // public inputType?: string;
  // public value: string;
  // public description?: string;
  // public options?: string[];
  public validations: Validation[];
  constructor(field: any) {
    let fieldItem = field.form_element_template;

    this.name = field.name;
    this.tracked_id = ft_lm.formElementId++;
    this.id = this.tracked_id;
    this.form_element_template = field.form_element_template;
    // this.form_element_list_values = _.cloneDeep(field.form_element_list_values);
    this.form_element_list_values = field.form_element_list_values;
    // this.name = fieldItem.name;
    // this.type = fieldItem.form_element_type.name;
    // // FIXME remove inputType
    // this.inputType = fieldItem.name;
    // this.value = '';
    // this.description = fieldItem.description;
    // this.options = [];
    this.validations = [
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
    ];
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
  // stop the form builder drag & drop
  public stopDrag = false;
  public singles: any;
  // BOOKMARK data
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

  private _subs = new Subscription();
  private _regConfig = fieldConfig;
  private _essentialFields = essentialFields;
  private _suggestedFields = suggestedFields;
  private _shadow: any;
  private _shadowInnerHTML: string = 'test';
  private _dragDropTracker = true;
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

  constructor(
    private _dragulaService: DragulaService,
    private _fb: FormBuilder,
    private _cdRef: ChangeDetectorRef,
    private _dndFieldService: DndFieldService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _duplicateService: DuplicateService,
    private _form: FormService
  ) {
    // this._essentialFields.forEach((field) => {
    //   this.essentialBuilderFields.push(new FormElement(field));
    // });
    // this._suggestedFields.forEach((field) => {
    //   this.suggestedBuilderFields.push(new FormElement(field));
    // });

    // this._regConfig.forEach((field) => {
    //   this.renderedBuilderFields.push(new FormElement(field));
    // });

    // BOOKMARK this.myForm = this._fb.group({
    this.myForm = this._fb.group({
      // name: ['the form'],
      // form_element_fields: this._fb.array([]),
    });

    // this._addControls(this.myForm);
    // this._addControls2();

    this._subs.add(
      this._dragulaService.drag(this.builderContainer).subscribe(({ el }) => {
        console.log('drag start');
        this._dragDropTracker = true;
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
        .drop(this.builderContainer)
        .subscribe(({ el, target, source, sibling }) => {
          console.log('drop');
          this._dragDropTracker = false;
        })
    );

    this._subs.add(
      this._dragulaService
        .dragend(this.builderContainer)
        .subscribe(({ el }) => {
          console.log('drag end');
          this._shadow.innerHTML = this._shadowInnerHTML;
          console.log('this._dragDropTracker');
          console.log(this._dragDropTracker);

          if (this._dragDropTracker) {
            this._dndFieldService.setDndFieldEditVisibility$(true);
            this._dragDropTracker = false;
          }

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
          console.log('dropModel');

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
    // BOOKMARK _dragulaService.createGroup
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
      copyItem: (formElement: FormElement3) => {
        console.log(
          '%c formElement ',
          'background: #f2c080; color: #555a60; padding: 10px 20px; border: 0px solid #47C0BE; width: 100%; font-weight: bold; font-size: 13px;'
        );
        console.log(formElement);

        return new FormElement3(formElement);
        // return formElement;
        // return _.cloneDeep(formElement);
        // return { ...formElement };
      }, //Allow item to be coppied in another div
      removeOnSpill: false,
    });
  }

  ngOnInit(): void {
    this._form.fetchAll().subscribe({
      next: (forms) => {
        if (forms)
          console.log(
            '%c forms ',
            'background-color: yellow; color: #000; padding: 0 20px; border: 0px solid #47C0BE'
          );
        console.log(forms);
      },
    });
    // BOOKMARK fetch essential fields
    this._form.fetch({ name: 'essential fields' }).subscribe({
      next: (form) => {
        if (form)
          console.log(
            '%c form ',
            'background-color: yellow; color: #000; padding: 0 20px; border: 0px solid #47C0BE'
          );
        console.log(form);
        form.form_element_fields.forEach((field: any) => {
          this.essentialBuilderFields.push(new FormElement3(field));
        });
        console.log('this.essentialBuilderFields');
        console.log(this.essentialBuilderFields);
        this._addControls();
      },
    });
    // this._essentialFields.forEach((field) => {
    //   this.essentialBuilderFields.push(new FormElement(field));
    // });
    this._suggestedFields.forEach((field) => {
      this.suggestedBuilderFields.push(new FormElement(field));
    });
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
      this._dndFieldService.getUpdateControls$().subscribe({
        next: () => {
          console.log(
            '%c this._updateTargetContainer ',
            'background: #f2c080; color: #555a60; padding: 10px 20px; border: 0px solid #47C0BE; width: 100%; font-weight: bold; font-size: 13px;'
          );

          this._updateTargetContainer();
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
        error: (err: any) => {
          console.log('error');
          console.log(err);
        },
      })
    );

    this._subs.add(
      this._dndFieldService.getDeleteField$().subscribe({
        next: (field: any) => {
          this._dndFieldService.deleteFieldControl(this.myForm, field);
          this.renderedBuilderFields = this.renderedBuilderFields.filter(
            function (el) {
              return el.id != field.id;
            }
          );
        },
        error: (err: any) => {},
      })
    );

    // BOOKMARK save cancel
    this._subs.add(
      this._dndFieldService.getActionAndField$().subscribe({
        next: (actionAndField: ActionAndField) => {
          // console.log('renderedBuilderFieldsPrevState');
          // console.log(this.renderedBuilderFieldsPrevState);
          // console.log('renderedBuilderFields');
          // console.log(this.renderedBuilderFields);

          // console.log('fieldObj.fieldElement');
          // console.log(fieldObj.fieldElement);
          this.stopDrag = false;
          this._dndFieldService.setFieldEditMode$(false);
          this._dndFieldService.setDndFieldEditVisibility$(true);

          if (actionAndField.action === 'cancel')
            if (this.renderedBuilderFieldsPrevState.length > 0) {
              // checking the lenght when cancel click and the field not dragged
              // the array always empty before drag
              let currentField = this.renderedBuilderFieldsPrevState.find(
                (item) => item.id === actionAndField.fieldElement.id
              );

              if (currentField) currentField.isOngoing = false;
              this.renderedBuilderFields = _.cloneDeep(
                this.renderedBuilderFieldsPrevState
              );
              this.renderedBuilderFieldsPrevState = [];
              // click cancel and nothing there (builder canvas) only the curren element
            } else this.renderedBuilderFields = [];

          if (actionAndField.action === 'save') {
            // replaySubject old value (fieldObj.fieldElement) not destroyed
            // and ft_lm.formElementId give new ids for new created
            // fields then currentField may be undefined

            let formElementFieldsControlValue = (
              this.myForm.controls['form_element_fields'] as FormArray
            ).value;

            console.log('formElementFieldsControl');
            console.log(formElementFieldsControlValue);

            let currentFormElementField = formElementFieldsControlValue.find(
              (item: any) => item.id === actionAndField.fieldElement.id
            );

            let currentField = this.renderedBuilderFields.find(
              (item) => item.id === actionAndField.fieldElement.id
            );

            if (currentField) {
              currentField.isOngoing = false;
              if (currentFormElementField)
                currentField.form_element_list_values =
                  currentFormElementField.form_element_list_values;
              currentField.name = currentFormElementField.name;
            }
            // console.log(
            //   '%c currentField.name ',
            //   'background-color: yellow; color: #000; padding: 5px 20px; border: 0px solid #47C0BE'
            // );
            // console.log(currentField);
            // console.log(currentField.name);

            // this.myForm.removeControl(currentField.name);
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
      'background: yellow; color: #000; padding: 0 20px; border: 0px solid #47C0BE'
    );
    console.log('form.value', form.value);
    console.log('Valid?', form.valid); // true or false
    let objToSend = { name: form.value.form_name };

    this._form.create(form.value).subscribe({
      next: (form) => {
        if (form)
          console.log(
            '%c this._form.create ',
            'background-color: yellow; color: #000; padding: 0 20px; border: 0px solid #47C0BE'
          );
      },
    });
    // this._router.navigate(['/products/', this.productId]);
    // this._router.navigate(['/products/', '(edit:products/2)']);

    // this._router.navigate([
    //   '',
    //   {
    //     outlets: { primary: ['products'], edit: ['products', this.productId] },
    //   },
    // ]);

    // this._router.navigateByUrl('/products/(edit:products/2)');
  }

  public generatedFieldName(field: FieldConfig, prefix?: any) {
    return this._dndFieldService.generatedFieldName(field, prefix);
  }

  private _addControls() {
    this._dndFieldService.addControls(this.myForm, this.renderedBuilderFields);
  }

  private _updateTargetContainer() {
    // Error: Cannot find control with name
    console.log('this.essentialBuilderFields');
    console.log(this.essentialBuilderFields);
    console.log('this.renderedBuilderFields');
    console.log(this.renderedBuilderFields);
    console.log('this.myForm');
    console.log(this.myForm);

    // this._dndFieldService.addControls(this.myForm, this.renderedBuilderFields);
    this._addControls();

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
