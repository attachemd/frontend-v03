import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DuplicateService {
  private _existingUsernames = ['Batman', 'Superman', 'Joker', 'Luthor'];

  public checkIfUsernameExists(value: string) {
    return of(this._existingUsernames.some((a) => a === value)).pipe(
      delay(1000)
    );
  }
}
