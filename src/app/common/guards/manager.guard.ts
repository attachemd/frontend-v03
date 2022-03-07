import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { roles } from '../roles/roles.enum';
import { UserRole } from '../roles/user-role.model';
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
      this._userGrpService.userRole$.subscribe((userRoles) => {
        observer.next(this._manager(userRoles));
        observer.complete();
      });
    });
  }

  /**
   * A manager is either a manager or an admin
   * @param userRoles
   * @private
   */
  private _manager(userRoles: UserRole[]) {
    return (
      this._userGrpService.hasRole(userRoles, roles.manager) ||
      this._userGrpService.hasRole(userRoles, roles.admin)
    );
  }
}
