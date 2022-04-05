import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DndFieldService {
  private _fieldName$ = new ReplaySubject<{
    fieldName: string;
    fieldElement: any;
  }>(1);

  private _stopDrag$ = new Subject<boolean>();

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

  public setStopDrag$(stopDrag: boolean) {
    this._stopDrag$.next(stopDrag);
  }

  public getStopDrag$(): Subject<boolean> {
    return this._stopDrag$;
  }

  public toggleEditVisibility(event: any, visibility: string) {
    // event.target.querySelector('button').style.display = visibility;
    event.target
      .querySelectorAll('button')
      .forEach((el: any) => (el.style.display = visibility));
  }
}
