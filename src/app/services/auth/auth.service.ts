import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { UIService } from '../ui.service';
import { AuthData } from './auth-data.model';
import { User } from './user.model';

@Injectable()
export class AuthService {
  private _userId$ = new ReplaySubject<string | null>(1);
  private _authChange$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _uiService: UIService,
    private _jwtHelper: JwtHelperService
  ) {
    this._sendUserId();
    // this.setAuthChange(this.isAuthenticatedState());
  }

  public setUserId$(userId: string | null) {
    this._userId$.next(userId);
  }

  public getUserId$(): ReplaySubject<string | null> {
    return this._userId$;
  }

  public setAuthChange$(isAuthenticated: boolean) {
    this._authChange$.next(isAuthenticated);
  }

  public getAuthChange$(): Subject<boolean> {
    return this._authChange$;
  }

  /**
   * Authentication api/auth/access_token
   * @param {AuthData} authData : The user to be connected
   * @return {Observable<any>} any including token
   */
  public logon(authData: AuthData): Observable<any> {
    this._uiService.setLoadingState(true);
    let body = new URLSearchParams();

    body.set('username', authData.email);
    body.set('password', authData.password);

    let options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    };

    return this._http
      .post('api/auth/access_token', body.toString(), options)
      .pipe(map((dataJwt) => this._authenticated(dataJwt)));
  }

  public login(authData: AuthData): Observable<boolean> {
    if (!(authData && authData.email && authData.password)) return of(false);

    this._uiService.setLoadingState(true);
    let body = new URLSearchParams();

    body.set('username', authData.email);
    body.set('password', authData.password);

    let options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    };

    return this._http
      .post('api/auth/access_token', body.toString(), options)
      .pipe(
        map((dataJwt: any) => {
          this._uiService.setLoadingState(false);
          if (!dataJwt) return false;
          const decodedAccess = this._jwtHelper.decodeToken(dataJwt.access);

          console.log('access');
          console.log(dataJwt.access);
          console.log('decodedAccess');
          console.log(decodedAccess);
          localStorage.setItem('access', dataJwt.access);
          this.setUserId$(decodedAccess.id);
          // localStorage.setItem('refresh', data.refresh);
          return true;
        }),
        catchError((error) => {
          this._uiService.setLoadingState(false);
          console.log('error');
          console.log(error);
          this._uiService.showSnackBar(error.error.detail, undefined, 3000);
          return of(false);
        })
      );
  }

  public isAuthenticatedState(): boolean {
    return !!(this._isToken('access') && this._isTokensAlive());
  }

  public logout(): void {
    this.setAuthChange$(false);
    localStorage.removeItem('access');
    this._router.navigate(['/login']);
  }

  public authSuccessfully() {
    this.setAuthChange$(true);
    this._router.navigate(['/home']);
  }

  private _isTokensAlive(): boolean {
    return !this._jwtHelper.isTokenExpired();
  }

  private _isToken(type: string): string | boolean {
    let token: string | any = localStorage.getItem(type);
    let decodedToken: string | boolean = false;

    if (token)
      try {
        decodedToken = this._jwtHelper.decodeToken(token);
      } catch (error) {
        console.error(error);
        this._router.navigate(['/login']);
      }
    return decodedToken;
  }

  private _getUserId(): string | null {
    return this._decodedToken().id;
  }

  private _decodedToken(): any {
    return this._isToken('access');
  }

  private _sendUserId() {
    this.setUserId$(this._getUserId());
  }

  /**
   * Storage of the token and some user information
   * @param dataJwt
   * @private
   */
  private _authenticated(dataJwt: any): any {
    this._uiService.setLoadingState(false);
    console.log('dataJwt');

    console.log(dataJwt);
    localStorage.setItem('access', dataJwt.access);
    // localStorage.setItem('user', JSON.stringify(data.user));
    // this.userActivate$.next(data.user as User);
    this.setUserId$(dataJwt.id);
    return dataJwt;
  }
}
