import * as $ from 'jquery';
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/services/clients/client.model';
import { License } from 'src/app/services/licenses/license.model';
import { Product } from 'src/app/services/products/product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-license-edit',
  templateUrl: './license-edit.component.html',
  styleUrls: ['./license-edit.component.scss'],
})
export class LicenseEditComponent implements OnInit, OnDestroy {
  public myForm!: FormGroup;

  public builderContainer = 'BUILDER_CONTAINER';
  public suggestedBuilderFields = [
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

  public renderedBuilderFieldsBeforeDrag: any[] = [];
  public renderedBuilderFields: any[] = [];

  public condition = true;
  public status = false;
  public license = {} as License;
  public clients = [] as Client[];
  public products = [] as Product[];
  public selectedClientId = '';
  public stopDrag = false;

  private _regConfig = fieldConfig;

  private _shadow: any;
  private _shadowInnerHTML: string = 'test';

  private _subs = new Subscription();
  constructor(
    private _http: HttpClient,
    private _route: ActivatedRoute,
    private _dndFieldService: DndFieldService,
    private _fb: FormBuilder,
    private _cdRef: ChangeDetectorRef
  ) {
    this._regConfig.forEach((field) => {
      this.renderedBuilderFields.push(
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
    this.myForm = this._fb.group({
      key: ['', [Validators.required, Validators.minLength(8)]],
      status: [''],
      type: ['', Validators.required],
      description: ['', Validators.required],
      expiry: ['', Validators.required],
      client: ['', Validators.required],
      product: ['', Validators.required],
    });
    this._addControls(this.myForm);
  }

  ngOnInit(): void {
    // this._dndFieldService.setDndMode$(false);
    this._dndFieldService.setDndFieldEditVisibility$(false);
    this._route.params.subscribe({
      next: (params: any) => {
        this._http.get<License>('/api/licenses/' + params['id']).subscribe({
          next: (license: License): void => {
            this.license = license;
            this.selectedClientId = this.license.client.id;
            this.myForm.controls['key'].setValue(this.license.key);
            this.myForm.controls['status'].setValue(this.license.status);
            this.myForm.controls['type'].setValue(this.license.type);
            this.myForm.controls['description'].setValue(
              this.license.description
            );
            this.myForm.controls['expiry'].setValue(this.license.expiry);
            this.myForm.controls['client'].setValue(this.license.client.id);
            this.myForm.controls['product'].setValue(this.license.product.id);
            this._http.get<Client[]>('/api/clients').subscribe({
              next: (clients: Client[]): void => {
                this.clients = clients;
              },
              error: (error) => {
                console.log('error :', error);
              },
            });
            this._http.get<Product[]>('/api/products').subscribe({
              next: (products: Product[]): void => {
                this.products = products;
              },
              error: (error) => {
                console.log('error :', error);
              },
            });
          },
          error: (error) => {
            console.log('error :', error);
          },
        });
      },
      error: (error) => {
        console.log('error :', error);
      },
    });
  }

  public setStatus(): SafeHtml {
    return '<span title="active" class="status status-active">test</span>';
  }

  public setFieldName(fieldName: any): void {
    console.log('fieldName');
    console.log(fieldName);
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  public trackItem(index: number, item: any) {
    return item.tracked_id;
  }

  public onSubmit(form: FormGroup) {
    // console.log('Valid?', form.valid); // true or false
    console.log('form.value', form.value);
    console.log(
      'this.renderedBuilderFields',
      this.renderedBuilderFields
    );
  }

  private _addControls(formGroup: FormGroup) {
    this.renderedBuilderFields.forEach((field) => {
      if (field.type === 'button') return;
      if (field.type === 'date') field.value = new Date(field.value);

      const control = this._fb.control(
        field.value,
        this._bindValidations(field.validations || [])
      );

      // console.log('Cannot find control with name');

      formGroup.addControl(field.name, control);
    });
  }

  private _createControl() {
    // const group = this._fb.group({});
    this.myForm = this._fb.group({
      key: ['', [Validators.required, Validators.minLength(8)]],
      status: [''],
      type: ['', Validators.required],
      description: ['', Validators.required],
      expiry: ['', Validators.required],
      client: ['', Validators.required],
      product: ['', Validators.required],
    });

    this.renderedBuilderFields.forEach((field) => {
      if (field.type === 'button') return;
      const control = this._fb.control(
        field.value,
        this._bindValidations(field.validations || [])
      );

      this.myForm.addControl(field.name, control);
    });
    // return this.myForm;
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
      // let drake = this._dragulaService.find(this.builderContainer).drake;
      // let models = drake.models;
      // console.log('models');
      // console.log(models);
      // // models![0][0].name = 'attache';
      // models![0].push(
      //   new FormElement(
      //     'Text Area',
      //     'image',
      //     '<p class="many2class">new text 17</p>'
      //   )
      // );
      // models![0].pop();
      // console.log(models);

      // this.renderedBuilderFields = [...this.renderedBuilderFields];
      console.log('this.renderedBuilderFields');
      console.log(this.renderedBuilderFields);
      // this.renderedBuilderFields[0].id =
      //   this.renderedBuilderFields[0].id + 1000;
      // this.renderedBuilderFields[1].id =
      //   this.renderedBuilderFields[1].id + 1000;
      // this.renderedBuilderFields[2].id =
      //   this.renderedBuilderFields[2].id + 1000;
      for (let builder_element_model of this.renderedBuilderFields) {
        console.log('builder_element_model.tracked_id');
        console.log(builder_element_model.tracked_id);

        builder_element_model.tracked_id =
          builder_element_model.tracked_id! + 1000;
      }

      // this._changeDetection.detectChanges();
      // this.renderedBuilderFields.push(
      //   new FormElement(
      //     'Text Area',
      //     'image',
      //     '<p class="many2class">new text 17</p>'
      //   )
      // );
      // // this.renderedBuilderFields.pop();
      console.log('this.renderedBuilderFields');
      console.log(this.renderedBuilderFields);

      // this._addControls(this.myForm);
      // this._createControl();
      this._cdRef.detectChanges();
    }, 0);
  }
}
