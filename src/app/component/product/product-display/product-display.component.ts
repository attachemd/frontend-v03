import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/services/products/product.model';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.scss'],
})
export class ProductDisplayComponent implements OnInit {
  public product = {} as Product;
  constructor(private _route: ActivatedRoute, private _http: HttpClient) {}

  ngOnInit(): void {
    this._route.params.subscribe({
      next: (params: any) => {
        this._http.get<Product>('/api/products/' + params['id']).subscribe({
          next: (product: Product): void => {
            this.product = product;
            console.log('product');
            console.log(product);
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
}
