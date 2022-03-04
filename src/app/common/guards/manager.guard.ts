import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

export class ManagerGuard implements CanLoad, CanActivate {
  constructor(private userGrpService: UserGroupsService) {}
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
      this.userGrpService.connecte$.subscribe((connecte) => {
        observer.next(this._manager(connecte));
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
      this.userGrpService.hasRole(connecte, roles.gestionnaire) ||
      this.userGrpService.hasRole(connecte, roles.admin)
    );
  }
}
