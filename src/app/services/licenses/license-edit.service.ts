import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LicenseEditService {
  private _fieldNameChanged$ = new ReplaySubject<string | null>(1);
  constructor() {}
}
