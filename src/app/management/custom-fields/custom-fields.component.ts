import * as $ from 'jquery';
import * as _ from 'lodash';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import {
  FieldConfig,
  Validation,
} from 'src/app/services/dnd-field/field.model';
import { fieldConfig } from 'src/app/services/dnd-field/field.sample';
import { DndFieldService } from 'src/app/services/dnd-field/dnd-field.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  // public builderFields = [
  //   new FormElement(
  //     'Zip Code',
  //     'input',
  //     'label test',
  //     'text',
  //     'new text 03',
  //     [],
  //     []
  //   ),
  //   new FormElement(
  //     'Address',
  //     'input',
  //     'label test',
  //     'text',
  //     'new text 02',
  //     [],
  //     []
  //   ),
  //   new FormElement(
  //     'Full Name',
  //     'input',
  //     'label test',
  //     'text',
  //     'new text 01',
  //     [],
  //     []
  //   ),
  // ];

  // public builderFields = [
  //   new FormElement({
  //     name: 'Zip Code',
  //     type: 'input',
  //     label: 'label test',
  //     inputType: 'text',
  //     value: 'new text 03',
  //     options: [],
  //     validations: [],
  //   }),
  //   new FormElement({
  //     name: 'Address',
  //     type: 'input',
  //     label: 'label test',
  //     inputType: 'text',
  //     value: 'new text 02',
  //     options: [],
  //     validations: [],
  //   }),
  //   new FormElement({
  //     name: 'Full Name',
  //     type: 'input',
  //     label: 'label test',
  //     inputType: 'text',
  //     value: 'new text 01',
  //     options: [],
  //     validations: [],
  //   }),
  // ];

  public builderFields: any[] = [];
  public renderedBuilderFields: any[] = [];
  public renderedBuilderFieldsPrevState: any[] = [];
  public stopDrag = false;

  private _subs = new Subscription();
  private _regConfig = fieldConfig;
  private _shadow: any;
  private _shadowInnerHTML: string = 'test';
  constructor(
    private _dragulaService: DragulaService,
    private _fb: FormBuilder,
    private _cdRef: ChangeDetectorRef,
    private _dndFieldService: DndFieldService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    // this._regConfig.forEach((field) => {
    //   console.log('field');
    //   console.log(field);

    //   this.renderedBuilderFields.push(
    //     new FormElement(
    //       field.name,
    //       field.type!,
    //       field.label!,
    //       field.inputType!,
    //       field.value,
    //       field.options!,
    //       field.validations
    //     )
    //   );
    // });

    this._regConfig.forEach((field) => {
      this.builderFields.push(new FormElement(field));
    });

    // this._regConfig.forEach((field) => {
    //   this.renderedBuilderFields.push(new FormElement(field));
    // });

    this.myForm = this._fb.group({});

    this._addControls(this.myForm);

    this._subs.add(
      this._dragulaService.drag(this.builderContainer).subscribe(({ el }) => {
        this._dndFieldService.setDndFieldVisibility$(false);
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
          this._dndFieldService.setDndFieldVisibility$(false);
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
        // return new FormElement(
        //   formElement.name,
        //   formElement.type,
        //   formElement.label,
        //   formElement.inputType,
        //   formElement.value,
        //   formElement.options,
        //   formElement.validations
        // );
        return new FormElement(formElement);
      }, //Allow item to be coppied in another div
      // copySortSource: false,
      removeOnSpill: false,
    });
  }

  ngOnInit(): void {
    // Get product is
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
    this._dndFieldService.setDndFieldVisibility$(true);
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
          this._dndFieldService.setDndFieldVisibility$(true);

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
              // click cancel and nothing there only the curren element
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

  private _addControls(formGroup: FormGroup) {
    this.renderedBuilderFields.forEach((field) => {
      if (field.type === 'button') return;
      if (field.type === 'date') field.value = new Date(field.value);

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
        validList.push(validation.validator);
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
