import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable()
export class UIService {
  private _loadingStateChange$: Subject<boolean> = new Subject<boolean>();

  constructor(private _snackBar: MatSnackBar) {}

  public showSnackBar(
    message: string,
    action: string | undefined,
    duration: number
  ) {
    this._snackBar.open(message, action, {
      duration: duration,
    });
  }

  public setLoadingState(isLoadingState: boolean) {
    this._loadingStateChange$.next(isLoadingState);
  }

  public getLoadingState() {
    return this._loadingStateChange$;
  }
}
