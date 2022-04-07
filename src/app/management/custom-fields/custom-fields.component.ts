import * as $ from 'jquery';
import * as _ from 'lodash';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { Validation } from 'src/app/services/dnd-field/field.model';
import { fieldConfig } from 'src/app/services/dnd-field/field.sample';
import { DndFieldService } from 'src/app/services/dnd-field/dnd-field.service';

let ft_lm = { formElementId: 0 };

class FormElement {
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

@Component({
  selector: 'app-custom-fields',
  templateUrl: './custom-fields.component.html',
  styleUrls: ['./custom-fields.component.scss'],
})
export class CustomFieldsComponent implements OnInit, OnDestroy {
  public myForm!: FormGroup;
  public builderContainer = 'NEW_BUILDER_CONTAINER';
  public builder_elements_model_01 = [
    new FormElement(
      'Zip Code',
      'input',
      'label test',
      'text',
      'new text 03',
      [],
      []
    ),
    new FormElement(
      'Address',
      'input',
      'label test',
      'text',
      'new text 02',
      [],
      []
    ),
    new FormElement(
      'Full Name',
      'input',
      'label test',
      'text',
      'new text 01',
      [],
      []
    ),
  ];

  public builder_elements_model_02: any[] = [];
  public renderedBuilderFieldsBeforeDrag: any[] = [];
  public stopDrag = false;

  private _subs = new Subscription();
  private _regConfig = fieldConfig;
  private _shadow: any;
  private _shadowInnerHTML: string = 'test';
  constructor(
    private _dragulaService: DragulaService,
    private _fb: FormBuilder,
    private _cdRef: ChangeDetectorRef,
    private _dndFieldService: DndFieldService
  ) {
    this._regConfig.forEach((field) => {
      this.builder_elements_model_02.push(
        new FormElement(
          field.name,
          field.type!,
          field.label!,
          field.inputType!,
          field.value,
          field.options!,
          field.validations
        )
      );
    });

    this.myForm = this._fb.group({});

    this._addControls(this.myForm);

    this._subs.add(
      this._dragulaService
        .dragend(this.builderContainer)
        .subscribe(({ el }) => {
          console.log(
            '%c dragend ',
            'background: #2B916A; ' +
              'color: #fff; ' +
              'padding: 0 10px; ' +
              'border: 0px solid #47C0BE'
          );
          // this.stopDrag = true;
          this._shadow.innerHTML = this._shadowInnerHTML;

          // this.renderedBuilderFieldsBeforeDrag = _.cloneDeep(
          //   this.builder_elements_model_02
          // );
          // this._addControls(this.myForm);
          this._updateTargetContainer();
        })
    );
    this._subs.add(
      this._dragulaService.drag(this.builderContainer).subscribe(({ el }) => {
        console.log(
          '%c drag ',
          'background: #D46E95; ' +
            'color: #fff; ' +
            'padding: 0 10px; ' +
            'border: 0px solid #47C0BE'
        );
        // this.renderedBuilderFieldsBeforeDrag = [
        //   ...this.builder_elements_model_02,
        // ];
        this.renderedBuilderFieldsBeforeDrag = _.cloneDeep(
          this.builder_elements_model_02
        );
        console.log('this.renderedBuilderFieldsBeforeDrag');
        console.log(this.renderedBuilderFieldsBeforeDrag);

        this._shadow = el;
        this._shadowInnerHTML = el.innerHTML;
      })
    );

    this._subs.add(
      this._dragulaService.shadow(this.builderContainer).subscribe(({ el }) => {
        console.log('shadow');
        el.className = 'drop-here';
        el.innerHTML = 'Drop Here';
      })
    );

    this._subs.add(
      _dragulaService
        .dropModel(this.builderContainer)
        .subscribe(({ el, target, source, sourceModel, targetModel, item }) => {
          // el.classList.add('ongoing');
          // console.log("el.querySelector('#field_container')");
          // console.log(el.querySelector('#field_container'));
          // console.log('el.innerHTML');
          // console.log(el.innerHTML);
          console.log(
            '%c dropModel ',
            'background: #f5a142; ' +
              'color: #000; ' +
              'padding: 0 10px; ' +
              'border: 0px solid #47C0BE'
          );
          this.stopDrag = true;
          console.log('el', el);
          console.log('source', source);
          console.log('target', target);
          console.log('sourceModel', sourceModel);
          console.log('targetModel', targetModel);
          console.log('item', item);
          item.isOngoing = true;
          console.log('item', item);
          this._dndFieldService.setFieldEditMode$(true);
        })
    );
    this._subs.add(
      _dragulaService
        .removeModel(this.builderContainer)
        .subscribe(({ el, source, item, sourceModel }) => {
          console.log(
            '%c removeModel ',
            'background: #1975c5; ' +
              'color: #fff; ' +
              'padding: 0 10px; ' +
              'border: 0px solid #47C0BE'
          );
          this.stopDrag = false;
          console.log(el);
          console.log(source);
          console.log(sourceModel);
          console.log(item);
        })
    );
    this._dragulaService.createGroup(this.builderContainer, {
      moves: (el: any, container: any, handle: any): any => {
        // .classList.contains('ongoing')
        // if (el.classList.contains('ongoing')) return false;
        console.log('el.className');
        console.log(el.className);

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
        return new FormElement(
          formElement.name,
          formElement.type,
          formElement.label,
          formElement.inputType,
          formElement.value,
          formElement.options,
          formElement.validations
        );
      }, //Allow item to be coppied in another div
      // copySortSource: false,
      removeOnSpill: false,
      // removeOnSpill: false,
    });
  }

  ngOnInit(): void {
    console.log('CustomFieldsComponent');
    this._dndFieldService.setDndMode$(true);
    this._dndFieldService.getFieldEditMode$().subscribe({
      next: (isFieldOnEditMode: boolean) => {
        if (isFieldOnEditMode)
          this.renderedBuilderFieldsBeforeDrag = _.cloneDeep(
            this.builder_elements_model_02
          );
        console.log('renderedBuilderFieldsBeforeDrag');
        console.log(this.renderedBuilderFieldsBeforeDrag);
        console.log('this.builder_elements_model_02');
        console.log(this.builder_elements_model_02);
      },
      error: (err: any) => {
        console.log('error');
        console.log(err);
      },
    });
    this._dndFieldService.getStopDrag$().subscribe({
      next: (stopDrag: boolean) => {
        this.stopDrag = stopDrag;
      },
      error: (err: any) => {},
    });
    this._dndFieldService.getDeleteField$().subscribe({
      next: (fieldId: string) => {
        this.builder_elements_model_02 = this.builder_elements_model_02.filter(
          function (el) {
            return el.id != fieldId;
          }
        );
      },
      error: (err: any) => {},
    });
    this._subs.add(
      this._dndFieldService.getFieldName$().subscribe({
        next: (fieldObj: any) => {
          console.log(
            '%c cancel & save ',
            'background: red; ' +
              'color: #fff; ' +
              'padding: 0 10px; ' +
              'border: 1px solid #000'
          );
          this.stopDrag = false;
          this._dndFieldService.setFieldEditMode$(false);
          console.log('fieldName', fieldObj.fieldName);
          console.log('fieldElement', fieldObj.fieldElement);
          // fieldObj.fieldElement.isOngoing = false;
          console.log('this.renderedBuilderFieldsBeforeDrag.find');

          console.log(
            this.renderedBuilderFieldsBeforeDrag.find(
              (item) => item.id === fieldObj.fieldElement.id
            )
          );

          // this.renderedBuilderFieldsBeforeDrag.find(
          //   (item) => item.id === fieldObj.fieldElement.id
          // ).isOngoing = false;
          // console.log('renderedBuilderFieldsBeforeDrag');
          // console.log(this.renderedBuilderFieldsBeforeDrag);

          if (fieldObj.fieldName === 'cancel') {
            console.log(
              '%c cancel ',
              'background: red; ' +
                'color: #fff; ' +
                'padding: 0 10px; ' +
                'border: 1px solid #000'
            );
            console.log('renderedBuilderFieldsBeforeDrag');
            console.log(this.renderedBuilderFieldsBeforeDrag);
            // fieldObj.fieldElement.isOngoing = false;
            // checking the lenght when cancel click and the field not dragged
            // the array always empty before drag

            if (this.renderedBuilderFieldsBeforeDrag.length > 0) {
              let currentField = this.renderedBuilderFieldsBeforeDrag.find(
                (item) => item.id === fieldObj.fieldElement.id
              );

              if (currentField) currentField.isOngoing = false;
              this.builder_elements_model_02 = _.cloneDeep(
                this.renderedBuilderFieldsBeforeDrag
              );
              // this.builder_elements_model_02 = [
              //   ...this.renderedBuilderFieldsBeforeDrag,
              // ];
              this.renderedBuilderFieldsBeforeDrag = [];
            }

            console.log('renderedBuilderFieldsBeforeDrag');
            console.log(this.renderedBuilderFieldsBeforeDrag);
            // fieldObj.fieldElement = null;
          } else {
            console.log(
              '%c save ',
              'background: red; ' +
                'color: #fff; ' +
                'padding: 0 10px; ' +
                'border: 1px solid #000'
            );
            console.log('this.builder_elements_model_02');
            console.log(this.builder_elements_model_02);

            this.builder_elements_model_02.find(
              (item) => item.id === fieldObj.fieldElement.id
            ).isOngoing = false;
            console.log('renderedBuilderFieldsBeforeDrag.find');
            this.renderedBuilderFieldsBeforeDrag.forEach((item) => {
              console.log('item');
              console.log(item);
            });
            console.log('fieldObj.fieldElement');
            console.log(fieldObj.fieldElement);

            console.log(
              '%c name ',
              'background: red; ' +
                'color: #fff; ' +
                'padding: 0 10px; ' +
                'border: 1px solid #000'
            );
            // console.log(
            //   this.renderedBuilderFieldsBeforeDrag.find(
            //     (item) => item.id === fieldObj.fieldElement.id
            //   ).name
            // );
            // this.myForm.removeControl(
            //   this.renderedBuilderFieldsBeforeDrag.find(
            //     (item) => item.id === fieldObj.fieldElement.id
            //   ).name
            // );
            this.myForm.removeControl(
              this.builder_elements_model_02.find(
                (item) => item.id === fieldObj.fieldElement.id
              ).name
            );
          }

          this._updateTargetContainer();
          // item.isOngoing = false;
        },
        error: (err: any) => {},
      })
    );

    let elementBuilder = $('#elem-id');
    // variables

    if (elementBuilder) {
      let topPosition = elementBuilder.offset()!.top - 10;

      // console.log('topPosition');
      // console.log(topPosition);
      // console.log('$(window)');
      // console.log($(window));

      window.addEventListener(
        'scroll',
        () => {
          // console.log('topPosition');
          // console.log(topPosition);
          // console.log('$(document).scrollTop()!');
          // console.log($(document).scrollTop()!);
          // console.log('$(".mat-sidenav-content").scrollTop()!');
          // console.log($('.mat-sidenav-content').scrollTop()!);
          // console.log('window.pageYOffset');
          // console.log(window.pageYOffset);
          // console.log('document.body.scrollTop');
          // console.log(document.body.scrollTop);

          if ($('.mat-sidenav-content').scrollTop()! > topPosition)
            elementBuilder.addClass('sticky');
          else elementBuilder.removeClass('sticky');
        },
        true
      );

      // $(document).on('scroll', () => {
      //   console.log('topPosition');
      //   console.log(topPosition);
      //   if ($(window).scrollTop()! > topPosition)
      //     elementBuilder.addClass('sticky');
      //   else elementBuilder.removeClass('sticky');
      // });
    }
  }

  ngOnDestroy(): void {
    console.log(
      '%c ngOnDestroy CustomFieldComponent ',
      'background: red; ' +
        'color: #fff; ' +
        'padding: 0 300px; ' +
        'border: 0px solid #47C0BE'
    );
    this._dragulaService.destroy(this.builderContainer);
    this._subs.unsubscribe();
  }

  private _addControls(formGroup: FormGroup) {
    this.builder_elements_model_02.forEach((field) => {
      if (field.type === 'button') return;
      if (field.type === 'date') field.value = new Date(field.value);
      console.log('field.name');
      console.log(field.name);
      console.log('field.value');
      console.log(field.value);

      const control = this._fb.control(
        field.value,
        this._bindValidations(field.validations || [])
      );

      // console.log('Cannot find control with name');

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
      for (let builder_element_model of this.builder_elements_model_02)
        builder_element_model.tracked_id =
          builder_element_model.tracked_id! + 1000;

      this._cdRef.detectChanges();
    }, 0);
  }
}
