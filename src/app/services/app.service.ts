import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private _openEditSideNav$: Subject<boolean> = new Subject<boolean>();

  constructor() {}

  public setOpenEditSideNav$(isMainNavOpened: boolean) {
    this._openEditSideNav$.next(isMainNavOpened);
  }

  public getOpenEditSideNav$() {
    return this._openEditSideNav$;
  }
}
