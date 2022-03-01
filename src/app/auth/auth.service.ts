import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, map, Observable, of, Subject } from "rxjs";
import { UIService } from "../shared/ui.service";
import { AuthData } from "./auth-data.model";

@Injectable()
export class AuthService {
    private _authChange$: Subject<boolean> = new Subject<boolean>();
    constructor(
        private _http: HttpClient,
        private _router: Router,
        private _uiService: UIService) { }

    public setAuthChange(isAuthenticated: boolean) {
        this._authChange$.next(isAuthenticated);
    }

    public getAuthChange(): Subject<boolean> {
        return this._authChange$
    }

    public login(authData: AuthData): Observable<boolean> {
        if (!(authData && authData.email && authData.password)) {
            return of(false);
        }

        this._uiService.setLoadingState(true);
        let body = new URLSearchParams();
        body.set('username', authData.email);
        body.set('password', authData.password);

        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        return this._http
            .post('api/auth/access_token', body.toString(), options)
            .pipe(
                map((data: any) => {
                    this._uiService.setLoadingState(false);
                    if (!data) {
                        return false;
                    }
                    console.log('access_token')
                    console.log(data.access_token)
                    localStorage.setItem('access_token', data.access_token);
                    // localStorage.setItem('refresh', data.refresh);
                    return true;
                }),
                catchError((error) => {
                    this._uiService.setLoadingState(false);
                    console.log('error');
                    console.log(error);
                    this._uiService.showSnackBar(
                        error.error.detail,
                        undefined,
                        3000
                    );
                    return of(false);
                })
            )


    }

    public logout(): void {
        this.setAuthChange(false);
        this._router.navigate(['/login'])
    }

    public authSuccessfully() {
        this.setAuthChange(true);
        this._router.navigate(['/home'])
    }
}