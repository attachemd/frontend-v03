import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneriCRUD } from '../base/generic_crud.service';
import { Form } from './form.model';

@Injectable({ providedIn: 'root' })
export class FormService extends GeneriCRUD<Form> {
  //   constructor(private _http: HttpClient) {
  //     super(_http);
  //   }
  private _url = 'api/forms';
  public getRootUrl(urlApp?: string): string {
    return this._url;
  }
}
