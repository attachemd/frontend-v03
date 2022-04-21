import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, Validators } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { FieldConfig, Validation } from './field.model';

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
      field.name.split(' ').join('_').toLowerCase().trim() +
      (prefix ?? '') +
      field.id
    );
  }

  public bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList: any[] = [];

      validations.forEach((validation: Validation) => {
        if (validation.name === 'required') validList.push(Validators.required);
        else if (validation.name === 'pattern')
          validList.push(Validators.pattern(validation.pattern));
        else if (validation.name === 'duplicated')
          validList.push(this._isDuplicate);
        // else if (validation.name === 'duplicate')
        //   validList.push(
        //     DuplicateValidator.createValidator(this._duplicateService)
        //   );
      });
      return Validators.compose(validList);
    }
    return null;
  }

  private _isDuplicate(control: AbstractControl) {
    setTimeout(() => {
      // console.log(
      //   '%c duplicated top ',
      //   'background-color: green; color: #fff; padding: 0 200px; border: 0px solid #47C0BE'
      // );
      // return null;
      let options = control.parent?.parent?.value;
      let opt = control.parent?.parent as FormArray;
      // let options = control.parent?.value;

      // console.log("formGroup.get('single_selection_editor')?.errors");
      // console.log(control.parent?.parent?.parent?.errors);

      // console.log('control');
      // console.log(control.value);
      // console.log('control.errors');
      // console.log(control.errors);
      // console.log('control.parent?.parent');
      // console.log(control.parent?.parent);

      // console.log('control: ');
      // console.log(control);
      // console.log('options: ');
      // console.log(options);

      // return { invalidUrl: true };
      // const valueArr = this.myForm.get('options')?.value;
      let names = options?.map((item: any) => {
        return item['name'];
      });

      // console.log('control.parent?.parent?.controls');
      // console.log(control.parent?.parent?.controls);
      // if (opt) console.log('--------------------------');
      // console.log(
      //   '%c -------------------------- ',
      //   'background-color: yellow; color: #000; padding: 0 200px; border: 0px solid #47C0BE'
      // );

      function getOccurrence(array: any, value: any) {
        var count = 0;

        array.forEach((v: any) => v.name === value && count++);
        return count;
      }
      function removeItemOnce(arr: any, value: any) {
        var index = arr.indexOf(value);

        if (index > -1) arr.splice(index, 1);

        return arr;
      }
      // let filteredArray = opt.value.filter(
      //   (e: any) => e.name !== control.value
      // );

      // let filteredArray = removeItemOnce(opt.value);

      // console.log('filteredArray');
      // console.log(filteredArray);

      // let found = filteredArray.find((x: any) => x.name === control.value);

      // console.log('control.value');
      // console.log(control.value);

      // console.log('found');
      // console.log(found);

      // let count = getOccurrence(opt.value, control.value);

      // console.log('count === 1');
      // console.log(count === 1);

      opt['controls'].forEach((item: any) => {
        // console.log('item.controls.name.value: ');
        // console.log(item.controls.name.value);
        // console.log('item.controls.name.errors: ');
        // console.log(item.controls.name.errors);
        // console.log("item.controls.name.hasError('duplicated')");
        // console.log(item.controls.name.hasError('duplicated'));
        let count = getOccurrence(opt.value, item.controls.name.value);

        // console.log('count === 1');
        // console.log(count === 1);

        // if (found !== undefined) control.setErrors({ duplicated: true });
        // if (item.controls.name.hasError('duplicated'))
        //   item.controls.name.setErrors(null);
        // control.setErrors({ duplicated: true });
        if (!item.controls.name.errors)
          if (count === 1) item.controls.name.setErrors(null);
          else item.controls.name.setErrors({ duplicated: true });
        else if (item.controls.name.hasError('duplicated') && count === 1)
          item.controls.name.setErrors(null);

        // console.log("item.controls.name.hasError('duplicated')");
        // console.log(item.controls.name.hasError('duplicated'));
      });

      // if (opt)
      //   for (let controlItem of opt['controls']) {
      //     console.log('controlItem');
      //     console.log(controlItem);
      //     controlItem.setErrors(null);
      //   }

      // if (control.parent?.parent)
      //   for (let controlItem of control.parent?.parent.controls) {
      //   }

      if (names) {
        let isDuplicate = new Set(names).size !== names.length;

        // console.log(
        //   '%c duplicated ',
        //   'background: red; color: #fff; padding: 0 200px; border: 0px solid #47C0BE'
        // );
        // console.log('names');
        // console.log(names);

        // console.log('isDuplicate');
        // console.log(isDuplicate);

        // if (isDuplicate) return { invalidUrl: true };
        // console.log('control.errors');
        // console.log(control.errors);

        // return control.setErrors(null);
        // if (isDuplicate) control.setErrors({ duplicated: true });
      }
      // console.log('hasError');
      // if (control.errors) console.log(control.errors);
      // else console.log('null');

      // return control.setErrors(null);

      // if (control.hasError('duplicated')) {
      //   console.log(
      //     '%c control ',
      //     'background: yellow; color: #fff; padding: 0 200px; border: 0px solid #47C0BE'
      //   );

      //   return control.setErrors(null);
      // }
      // return null;
      // return control.setErrors(null);
    }, 0);
  }
}
