import * as $ from 'jquery';
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/services/clients/client.model';
import { License } from 'src/app/services/licenses/license.model';
import { Product } from 'src/app/services/products/product.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  FieldConfig,
  Validation as Validation,
} from 'src/app/services/dnd-field/field.model';
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

  public renderedBuilderFieldsBeforeDrag: any[] = [];
  // public builder_elements_model_02 = [] as FieldConfig[];
  public builder_elements_model_02: any[] = [];
  // public builder_elements_model_02 = [
  //   // new FormElement(
  //   //   'Text Area',
  //   //   'image',
  //   //   '<div class="ft-lm-edit-field"><mat-form-field fxFlex="500px"><input matInput type="text" placeholder="Key" [(ngModel)]="license.key" /></mat-form-field></div>'
  //   // ),
  //   new FormElement('Text Area', 'input', 'new text 04'),
  //   new FormElement('Date Picker', 'input', 'new text 05'),
  //   new FormElement('Drop Down', 'input', 'new text 06'),
  // ];

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
    private _dragulaService: DragulaService,
    private _dndFieldService: DndFieldService,
    private _fb: FormBuilder,
    private _cdRef: ChangeDetectorRef
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
    this._dndFieldService.setDndMode$(false);
    this._route.params.subscribe({
      next: (params: any) => {
        // colorfull log
        console.log(
          '%c ActivatedRoute ',
          'background: #B8FF13; ' +
            'color: #000; ' +
            'padding: 10px; ' +
            'border: 1px solid #47C0BE'
        );
        // this.id = params['id'];
        this._http.get<License>('/api/licenses/' + params['id']).subscribe({
          next: (license: License): void => {
            console.log('license');
            console.log(license);
            this.license = license;
            this.selectedClientId = this.license.client.id;
            this.myForm.controls['client'].setValue(this.license.client.id);
            this.myForm.controls['product'].setValue(this.license.product.id);
            this._http.get<Client[]>('/api/clients').subscribe({
              next: (clients: Client[]): void => {
                console.log('clients');
                console.log(clients);
                this.clients = clients;
              },
              error: (error) => {
                console.log('error :', error);
              },
            });
            this._http.get<Product[]>('/api/products').subscribe({
              next: (products: Product[]): void => {
                console.log('products');
                console.log(products);
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
    // console.log('history.state');
    // console.log(history.state);
    // this._http.get<License>('/api/licenses/' + history.state.id).subscribe({
    //   next: (license: License): void => {
    //     console.log('license');
    //     console.log(license);
    //     this.license = license;
    //   },
    //   error: (error) => {
    //     console.log('error :', error);
    //   },
    // });
  }

  // ngAfterViewInit(): void {
  //   let elementBuilder = $('#elem-id');
  //   // variables

  //   let topPosition = elementBuilder.offset()!.top - 10;

  //   console.log('topPosition');
  //   console.log(topPosition);
  //   console.log('$(window)');
  //   console.log($(window));
  //   $('body').on('scroll', () => {
  //     console.log('topPosition');
  //     console.log(topPosition);
  //     if ($(window).scrollTop()! > topPosition)
  //       elementBuilder.addClass('sticky');
  //     else elementBuilder.removeClass('sticky');
  //   });
  // }

  public setStatus(): SafeHtml {
    return '<span title="active" class="status status-active">test</span>';
  }

  public setFieldName(fieldName: any): void {
    console.log('fieldName');
    console.log(fieldName);
  }

  ngOnDestroy(): void {
    console.log(
      '%c ngOnDestroy LicenseEditComponent ',
      'background: red; ' +
        'color: #fff; ' +
        'padding: 0 300px; ' +
        'border: 0px solid #47C0BE'
    );
    this._subs.unsubscribe();
  }

  public trackItem(index: number, item: any) {
    // return item.trackId;
    return item.tracked_id;
  }

  public onSubmit(form: FormGroup) {
    // console.log('Valid?', form.valid); // true or false
    console.log('form.value', form.value);
    console.log(
      'this.builder_elements_model_02',
      this.builder_elements_model_02
    );
    // this._updateTargetContainer();
  }

  // private _initializeFormGroup(){

  // }

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

    this.builder_elements_model_02.forEach((field) => {
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

      // this.builder_elements_model_02 = [...this.builder_elements_model_02];
      console.log('this.builder_elements_model_02');
      console.log(this.builder_elements_model_02);
      // this.builder_elements_model_02[0].id =
      //   this.builder_elements_model_02[0].id + 1000;
      // this.builder_elements_model_02[1].id =
      //   this.builder_elements_model_02[1].id + 1000;
      // this.builder_elements_model_02[2].id =
      //   this.builder_elements_model_02[2].id + 1000;
      for (let builder_element_model of this.builder_elements_model_02) {
        console.log('builder_element_model.tracked_id');
        console.log(builder_element_model.tracked_id);

        builder_element_model.tracked_id =
          builder_element_model.tracked_id! + 1000;
      }

      // this._changeDetection.detectChanges();
      // this.builder_elements_model_02.push(
      //   new FormElement(
      //     'Text Area',
      //     'image',
      //     '<p class="many2class">new text 17</p>'
      //   )
      // );
      // // this.builder_elements_model_02.pop();
      console.log('this.builder_elements_model_02');
      console.log(this.builder_elements_model_02);

      // this._addControls(this.myForm);
      // this._createControl();
      this._cdRef.detectChanges();
    }, 0);
  }
}
