import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LicenseEditService {
  private _fieldName$ = new ReplaySubject<string>(1);
  constructor() {}

  public setFieldName$(fieldName: string) {
    this._fieldName$.next(fieldName);
  }

  public getFieldName$(): ReplaySubject<string> {
    return this._fieldName$;
  }
}
