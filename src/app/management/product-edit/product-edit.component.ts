import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DndFieldService } from 'src/app/services/dnd-field/dnd-field.service';
import { Validation } from 'src/app/services/dnd-field/field.model';
import { fieldConfig } from 'src/app/services/dnd-field/field.sample';
import { FormService } from 'src/app/services/forms/form.service';
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

class FormElement3 {
  public name?: string;
  public id: number;
  public form_element_template: any;
  public form_element_options: any;
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
    // this.form_element_options = _.cloneDeep(field.form_element_options);
    this.form_element_options = field.form_element_options;
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
    private _router: Router,
    private _form: FormService
  ) {
    // this._regConfig.forEach((field) => {
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
    this.myForm = this._fb.group({
      product_name: ['', [Validators.required, Validators.minLength(8)]],
      description: ['', Validators.required],
    });
    this._addControls();
  }

  ngOnInit(): void {
    // this._dndFieldService.setDndMode$(false);
    this._dndFieldService.setDndFieldEditVisibility$(false);
    this._route.params.subscribe({
      next: (params: any) => {
        this._http.get<Product>('/api/products/' + params['id']).subscribe({
          next: (product: Product): void => {
            this.product = product;
            this.myForm.controls['product_name'].setValue(this.product.name);
            this.myForm.controls['description'].setValue(
              this.product.description
            );
            this._form.fetch({ id: '2' }).subscribe({
              next: (form) => {
                if (form) {
                  console.log(
                    '%c product fetched form ',
                    'background: red; color: #fff; padding: 0 20px; border: 0px solid #47C0BE; width: 100%; font-weight: bold; font-size: 13px;'
                  );
                  console.log(form);

                  form.form_element_fields.forEach((field: any) => {
                    this.renderedBuilderFields.push(new FormElement3(field));
                  });
                  console.log('this.essentialBuilderFields');
                  console.log(this.renderedBuilderFields);
                  this._addControls();
                }
                console.log(
                  '%c form ',
                  'background-color: yellow; color: #000; padding: 0 20px; border: 0px solid #47C0BE'
                );
                console.log(form);
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
    console.log(
      '%c save ',
      'background: yellow; color: #000; padding: 0 20px; border: 0px solid #47C0BE'
    );
    console.log('form.value', form.value);
    console.log('Valid?', form.valid); // true or false
    console.log('this.renderedBuilderFields', this.renderedBuilderFields);
    this._router.navigate([
      '',
      {
        outlets: { primary: ['products'], edit: null },
      },
    ]);
  }

  private _addControls() {
    this._dndFieldService.addControls(this.myForm, this.renderedBuilderFields, [
      'product_name',
      'description',
    ]);
  }

  // private _addControls(formGroup: FormGroup) {
  //   this.renderedBuilderFields.forEach((field) => {
  //     if (field.type === 'button') return;
  //     if (field.type === 'date') field.value = new Date(field.value);

  //     const control = this._fb.control(
  //       field.value,
  //       this._bindValidations(field.validations || [])
  //     );

  //     formGroup.addControl(field.name, control);
  //   });
  // }

  // private _bindValidations(validations: any) {
  //   if (validations.length > 0) {
  //     const validList: any[] = [];

  //     validations.forEach((validation: Validation) => {
  //       if (validation.name === 'required') validList.push(Validators.required);
  //       else if (validation.name === 'pattern')
  //         validList.push(Validators.pattern(validation.pattern));
  //     });
  //     return Validators.compose(validList);
  //   }
  //   return null;
  // }
}
