import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { roles } from '../roles/roles.enum';
import { UserGroups } from '../roles/user-groups.model';
import { UserGroupsService } from '../roles/user-groups.service';

export class ManagerGuard implements CanLoad, CanActivate {
  constructor(private _userGrpService: UserGroupsService) {}
  public canLoad(route: Route): Observable<boolean> {
    return this._isManager();
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this._isManager();
  }

  /**
   * Is manager ?
   */
  private _isManager(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this._userGrpService.connected$.subscribe((connected) => {
        observer.next(this._manager(connected));
        observer.complete();
      });
    });
  }

  /**
   * A manager is either a manager or an admin
   * @param connecte
   * @private
   */
  private _manager(connecte: UserGroups) {
    return (
      this._userGrpService.hasRole(connecte, roles.manager) ||
      this._userGrpService.hasRole(connecte, roles.admin)
    );
  }
}
