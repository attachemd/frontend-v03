import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private _openEditSideNav$: Subject<boolean> = new Subject<boolean>();

  constructor() {}

  public setOpenEditSideNav$(isOpened: boolean) {
    this._openEditSideNav$.next(isOpened);
  }

  public getOpenEditSideNav$() {
    return this._openEditSideNav$;
  }
}
