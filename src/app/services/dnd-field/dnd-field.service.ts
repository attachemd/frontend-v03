import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { FieldConfig } from './field.model';

@Injectable({
  providedIn: 'root',
})
export class DndFieldService {
  /**
   * used for (confirm field edit) communications.
   */
  private _fieldName$ = new ReplaySubject<{
    fieldName: string;
    fieldElement: any;
  }>(1);

  private _stopDrag$ = new Subject<boolean>();
  private _updateControls$ = new Subject<void>();
  private _fieldEditMode$ = new ReplaySubject<boolean>(1);
  private _deleteField$ = new Subject<string>();
  private _dndMode$ = new ReplaySubject<boolean>(1);
  private _dndFieldEditVisibility$ = new ReplaySubject<boolean>(1);

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

  public setUpdateControls$() {
    this._updateControls$.next();
  }

  public getUpdateControls$(): Subject<void> {
    return this._updateControls$;
  }

  public setFieldEditMode$(isfieldEditMode: boolean) {
    this._fieldEditMode$.next(isfieldEditMode);
  }

  public getFieldEditMode$(): ReplaySubject<boolean> {
    return this._fieldEditMode$;
  }

  public setDeleteField$(fieldId: string) {
    this._deleteField$.next(fieldId);
  }

  public getDeleteField$(): Subject<string> {
    return this._deleteField$;
  }

  public setDndMode$(isOnDndMode: boolean) {
    this._dndMode$.next(isOnDndMode);
  }

  public getDndMode$(): ReplaySubject<boolean> {
    return this._dndMode$;
  }

  public setDndFieldEditVisibility$(isDndFieldEditVisible: boolean) {
    this._dndFieldEditVisibility$.next(isDndFieldEditVisible);
  }

  public getDndFieldEditVisibility$(): ReplaySubject<boolean> {
    return this._dndFieldEditVisibility$;
  }

  public toggleEditVisibility(event: any, visibility: string) {
    // event.target.querySelector('button').style.display = visibility;
    event.target
      .querySelectorAll('button')
      .forEach((el: any) => (el.style.display = visibility));
  }

  public generatedFieldName(field: FieldConfig, prefix?: string) {
    return (
      field.label?.split(' ').join('_').toLowerCase().trim() +
      (prefix ?? '') +
      field.id
    );
  }
}
