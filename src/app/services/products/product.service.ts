import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneriCRUD } from '../base/generic_crud.service';
import { Product } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductService extends GeneriCRUD<Product> {
  //   constructor(private _http: HttpClient) {
  //     super(_http);
  //   }
  private _url = 'api/products';
  public getRootUrl(urlApp?: string): string {
    return this._url;
  }
}
