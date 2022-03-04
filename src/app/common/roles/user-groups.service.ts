import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { filter, mergeMap, ReplaySubject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserGroups } from './user-groups.model';

@Injectable()
export class UserGroupsService implements OnDestroy {
  private _connected$ = new ReplaySubject<UserGroups>(1);
  private _connectedSubscription: Subscription = new Subscription();
  constructor(private _http: HttpClient, private _authService: AuthService) {
    this._connectedSubscription = this._authService.userActivate$
      .pipe(
        filter((user) => !!user),
        mergeMap((user) => this.get(user.username))
      )
      .subscribe((connected) => this._connected$.next(connected as UserGroups));
  }

  ngOnDestroy(): void {
    this._connectedSubscription.unsubscribe();
  }
}
