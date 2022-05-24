import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/services/forms/form.service';
import { Product } from 'src/app/services/products/product.model';
import { ProductService } from 'src/app/services/products/product.service';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.scss'],
})
export class ProductDisplayComponent implements OnInit {
  public product = {} as Product;
  public form = {} as any;
  constructor(
    private _route: ActivatedRoute,
    private _http: HttpClient,
    private _product: ProductService,
    private _form: FormService
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe({
      next: (params: any) => {
        // this._http.get<Product>('/api/products/' + params['id']).subscribe({
        //   next: (product: Product): void => {
        //     this.product = product;
        //     console.log('product');
        //     console.log(product);
        //   },
        //   error: (error) => {
        //     console.log('error :', error);
        //   },
        // });
        this._product.fetch({ id: params['id'] }).subscribe({
          next: (product: Product): void => {
            this.product = product;
            console.log('product');
            console.log(product);
            if (product.form_id)
              this._form.fetch({ id: product.form_id }).subscribe({
                next: (form: any): void => {
                  this.form = form;
                  console.log('form');
                  console.log(form);
                },
              });
          },
        });
      },
      error: (error) => {
        console.log('error :', error);
      },
    });
  }

  public log(val: any) {
    // console.log('from RadioButtonComponent');

    console.log(val);
  }

  public getValue(formItem: any): any {
    if (formItem.selected_value?.value) return [formItem.selected_value?.value];
    else if (formItem.selected_list_values.length > 0)
      return formItem.selected_list_values;
    else return [];
  }
}
