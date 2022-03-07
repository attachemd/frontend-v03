import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import {
  catchError,
  filter,
  mergeMap,
  Observable,
  of,
  ReplaySubject,
  Subject,
  Subscription,
} from 'rxjs';

import { AuthService } from 'src/app/services/auth/auth.service';
import { UserRole } from './user-role.model';

@Injectable({ providedIn: 'root' })
export class UserGroupsService implements OnDestroy {
  public userRole$ = new ReplaySubject<UserRole[]>(1);
  private _connectedSubscription: Subscription = new Subscription();
  constructor(private _http: HttpClient, private _authService: AuthService) {
    // this._userGrpService.userRole$.next([{ name: 'manager' }]);
    // this.userRole$.next([{ name: 'manager' }]);
    this._connectedSubscription = this._authService
      .getUserId$()
      .pipe(
        filter((id) => !!id),
        mergeMap((id) => this._get(id!))
      )
      .subscribe((userRoles) => this.userRole$.next(userRoles as UserRole[]));
  }

  /**
   * Does the active user have such a role?
   * @param userRoles : the userRoles to be tested
   * @param roleName : roleName to test on the active user
   */
  public hasRole(userRoles: UserRole[], roleName: string): boolean {
    return userRoles && userRoles.some((role) => role.name === roleName);
  }

  ngOnDestroy(): void {
    this._connectedSubscription.unsubscribe();
  }

  /**
   * Extra check for token validation
   * @param {string} uid : the user id
   * @returns {Observable<UserRole[] | null>}
   */
  private _get(uid: string): Observable<UserRole[] | null> {
    return this._http.get<UserRole[]>(`api/user-roles/${uid}`).pipe(
      catchError((err: HttpErrorResponse) => {
        // if (err && err.status === 401 && err.error && 'detail' in err.error)
        console.error('An error occurred:', err);

        return of(null);
      })
    );
  }
}
