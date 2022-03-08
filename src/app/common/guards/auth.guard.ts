import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}

  public canLoad(route: Route): Observable<boolean> {
    return this._isAuthenticated();
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this._isAuthenticated();
  }

  /**
   * Is authenticated ?
   */
  private _isAuthenticated(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      if (!this._authService.isAuthenticatedState())
        this._router.navigate(['/login']);
      observer.next(this._authService.isAuthenticatedState());
      observer.complete();
    });
  }
}
