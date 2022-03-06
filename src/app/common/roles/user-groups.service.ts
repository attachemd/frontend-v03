import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import {
  catchError,
  filter,
  mergeMap,
  Observable,
  of,
  ReplaySubject,
  Subscription,
} from 'rxjs';

import { AuthService } from 'src/app/services/auth/auth.service';
import { UserGroups } from './user-groups.model';

@Injectable({ providedIn: 'root' })
export class UserGroupsService implements OnDestroy {
  public connected$ = new ReplaySubject<UserGroups>(1);
  private _connectedSubscription: Subscription = new Subscription();
  constructor(private _http: HttpClient, private _authService: AuthService) {
    this._connectedSubscription = this._authService.userActivate$
      .pipe(
        filter((id) => !!id),
        mergeMap((id) => this._get(id))
      )
      .subscribe((connected) => this.connected$.next(connected as UserGroups));
  }

  /**
   * Does the connected have such a role/group?
   * @param connected : the user to be tested
   * @param role : role / group to test on the connected
   */
  public hasRole(connected: UserGroups, role: string): boolean {
    return (
      connected &&
      'groups' in connected &&
      connected.groups.some((name) => name === role)
    );
  }

  ngOnDestroy(): void {
    this._connectedSubscription.unsubscribe();
  }

  private _get(uid: string): Observable<UserGroups | null> {
    return this._http.get<UserGroups>(`api/user-roles/${uid}`).pipe(
      catchError((err: HttpErrorResponse) => {
        if (
          err &&
          err.status === 401 &&
          err.error &&
          'detail' in err.error &&
          err.error.detail === 'Signature has expired.'
        )
          console.error('An error occurred:', err);

        return of(null);
      })
    );
  }
}
