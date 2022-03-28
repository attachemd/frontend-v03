import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LicenseEditService {
  private _fieldName$ = new ReplaySubject<{
    fieldName: string;
    fieldElement: any;
  }>(1);

  constructor() {}

  public setFieldName$(fieldName: string, fieldElement: any) {
    this._fieldName$.next({ fieldName, fieldElement });
  }

  public getFieldName$(): ReplaySubject<{
    fieldName: string;
    fieldElement: any;
  }> {
    return this._fieldName$;
  }
}
