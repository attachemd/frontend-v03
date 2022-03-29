import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/services/clients/client.model';
import { License } from 'src/app/services/licenses/license.model';
import { Product } from 'src/app/services/products/product.model';
import { LicenseEditService } from 'src/app/services/licenses/license-edit.service';
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

let ft_lm = { formElementId: 0 };

class FormElement {
  public id: number;
  public isOngoing = false;
  constructor(
    public name: string,
    public type: string,
    public content: string,
    public validations: Validation[]
  ) {
    this.id = ft_lm.formElementId++;
  }
}

@Component({
  selector: 'app-license-edit',
  templateUrl: './license-edit.component.html',
  styleUrls: ['./license-edit.component.scss'],
})
export class LicenseEditComponent implements OnInit, OnDestroy {
  public myForm: FormGroup;

  public builderContainer = 'BUILDER_CONTAINER';
  public builder_elements_model_01 = [
    new FormElement('Form Field', 'input', 'new text 03', []),
    new FormElement('Radio Button', 'input', 'new text 02', []),
    new FormElement('Text Area', 'input', 'new text 01', []),
  ];

  public renderedBuilderFieldsBeforeDrag: any[] = [];
  public builder_elements_model_02 = [] as FieldConfig[];
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

  private _regConfig = fieldConfig;

  private _shadow: any;
  private _shadowInnerHTML: string = 'test';

  private _subs = new Subscription();
  constructor(
    private _http: HttpClient,
    private _route: ActivatedRoute,
    private _dragulaService: DragulaService,
    private _licenseEditService: LicenseEditService,
    private _fb: FormBuilder
  ) {
    this._regConfig.forEach((field) => {
      this.builder_elements_model_02.push(
        new FormElement(
          field.name,
          field.type,
          'new text 04',
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
    this._subs.add(
      this._dragulaService
        .dragend(this.builderContainer)
        .subscribe(({ el }) => {
          this._shadow.innerHTML = this._shadowInnerHTML;
          // this._shadow.innerHTML = this.builder_elements_model_02[0].content;
          // el.className = 'ongoing';
          // el.classList.add('ongoing');
          // this._shadow.className = 'ongoing';
          // console.log('dragend');
          // console.log("el.querySelector('.field_container')");
          // console.log(el.querySelector('.field_container'));
          // console.log('el.innerHTML');
          // console.log(el.innerHTML);

          // this._updateTargetContainer();
          // console.log(this._shadowInnerHTML);

          this._updateTargetContainer();
          // let ongoing = el.querySelector('.field_container');

          // console.log('ongoing');
          // console.log(ongoing);

          // ongoing?.classList.add('ongoing');
        })
    );
    this._subs.add(
      this._dragulaService.drag(this.builderContainer).subscribe(({ el }) => {
        console.log('drag');
        this.renderedBuilderFieldsBeforeDrag = [
          ...this.builder_elements_model_02,
        ];
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

          console.log('dropModel:');
          console.log('el', el);
          console.log('source', source);
          console.log('target', target);
          console.log('sourceModel', sourceModel);
          console.log('targetModel', targetModel);
          console.log('item', item);
          item.isOngoing = true;
          console.log('item', item);
        })
    );
    this._subs.add(
      _dragulaService
        .removeModel(this.builderContainer)
        .subscribe(({ el, source, item, sourceModel }) => {
          console.log('removeModel:');
          console.log(el);
          console.log(source);
          console.log(sourceModel);
          console.log(item);
        })
    );
    this._dragulaService.createGroup(this.builderContainer, {
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
          formElement.content,
          formElement.validations
        );
      }, //Allow item to be coppied in another div
      // copySortSource: false,
      removeOnSpill: true,
      // removeOnSpill: false,
    });
  }

  ngOnInit(): void {
    // this.myForm = new FormGroup({
    //   name: new FormControl('Sammy'),
    //   email: new FormControl(''),
    //   message: new FormControl('')
    // });
    console.log('this.builder_elements_model_02');
    console.log(this.builder_elements_model_02);
    this._licenseEditService.getFieldName$().subscribe({
      next: (fieldObj: any) => {
        console.log('fieldName', fieldObj.fieldName);
        console.log('fieldElement', fieldObj.fieldElement);
        fieldObj.fieldElement.isOngoing = false;
        if (fieldObj.fieldName === 'cancel') {
          this.builder_elements_model_02 = [
            ...this.renderedBuilderFieldsBeforeDrag,
          ];
          this.renderedBuilderFieldsBeforeDrag = [];
        }

        this._updateTargetContainer();
        // item.isOngoing = false;
      },
      error: (err: any) => {},
    });
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

    this._route.params.subscribe({
      next: (params: any) => {
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
    this._dragulaService.destroy(this.builderContainer);
    this._subs.unsubscribe();
  }

  public trackItem(index: number, item: any) {
    // return item.trackId;
    return item.id;
  }

  public onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('key', form.value.key);
    console.log('status', form.value.status);
    console.log('type', form.value.type);
    console.log('description', form.value.description);
    console.log('expiry', form.value.expiry);
    console.log('client', form.value.client);
    console.log('product', form.value.product);
    console.log('name', form.value.name);
  }

  // private _initializeFormGroup(){

  // }

  private _addControls(formGroup: FormGroup) {
    this.builder_elements_model_02.forEach((field) => {
      if (field.type === 'button') return;
      const control = this._fb.control(
        field.value,
        this._bindValidations(field.validations || [])
      );

      formGroup.addControl(field.name, control);
    });
  }

  private _createControl() {
    const group = this._fb.group({});

    this.builder_elements_model_02.forEach((field) => {
      if (field.type === 'button') return;
      const control = this._fb.control(
        field.value,
        this._bindValidations(field.validations || [])
      );

      group.addControl(field.name, control);
    });
    return group;
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

  private _getRenderedBuilderFieldsNewOrder(): any[] {
    let form_elements = document.querySelectorAll(
      '.builder-render .builder-element'
    );
    let renderedBuilderFieldElements: any[] = [];

    // console.log('form_element');
    // console.log(form_elements);
    form_elements.forEach((form_element: any) => {
      // console.log('form_element');
      // console.log(form_element.fieldData);
      renderedBuilderFieldElements.push(form_element.fieldData);
    });
    return renderedBuilderFieldElements;
  }

  private _updateTargetContainer() {
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
    for (let builder_element_model of this.builder_elements_model_02)
      builder_element_model.id = builder_element_model.id! + 1000;

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
    console.log('this._getRenderedBuilderFieldsNewOrder()');
    console.log(this._getRenderedBuilderFieldsNewOrder());
    this._addControls(this.myForm);
  }
}
