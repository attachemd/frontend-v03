import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DndFieldService } from 'src/app/services/dnd-field/dnd-field.service';
import { Validation } from 'src/app/services/dnd-field/field.model';
import { fieldConfig } from 'src/app/services/dnd-field/field.sample';
import { Product } from 'src/app/services/products/product.model';

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
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit, OnDestroy {
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
  public product = {} as Product;
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
    private _cdRef: ChangeDetectorRef,
    private _router: Router
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
      product_name: ['', [Validators.required, Validators.minLength(8)]],
      description: ['', Validators.required],
    });
    this._addControls(this.myForm);
  }

  ngOnInit(): void {
    // this._dndFieldService.setDndMode$(false);
    this._dndFieldService.setDndFieldVisibility$(false);
    this._route.params.subscribe({
      next: (params: any) => {
        this._http.get<Product>('/api/products/' + params['id']).subscribe({
          next: (product: Product): void => {
            this.product = product;
            this.myForm.controls['product_name'].setValue(this.product.name);
            this.myForm.controls['description'].setValue(
              this.product.description
            );
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
    console.log('this.renderedBuilderFields', this.renderedBuilderFields);
    this._router.navigate([
      '',
      {
        outlets: { primary: ['products'], edit: null },
      },
    ]);
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
}
