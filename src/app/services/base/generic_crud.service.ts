import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

/**
 * CrudGeneric : provision of CRUD on a type T
 */
@Injectable({ providedIn: 'root' })
export abstract class GeneriCRUD<T> {
  protected constructor(private _http: HttpClient) {}

  /**
   * Creation of an entity of type T, in POST
   * @param object : the object to create
   */
  public create(object: T) {
    const url = this._getUrl();

    return this._http
      .post(url, JSON.stringify(object), { headers: this._setHeadersJson() })
      .pipe(
        finalize(() => {
          //   this.clearCache();
          //   this.loadingSubject.next(false);
        }),
        catchError((error) => this._catchError(error))
      );
  }

  /**
   * Determines the API URL to use, with or without id
   * @param id
   * @protected
   */
  protected _getUrl(id = null) {
    let url = this.getRootUrl();

    if (id !== null) url = `${url}${id}/`;

    return url;
  }

  /**
   * Setting the type of data passed via http headers as application/json
   * for POST
   * @private
   */
  private _setHeadersJson(): HttpHeaders {
    const headers = new HttpHeaders();

    return headers.append('content-type', 'application/json');
  }

  private _catchError(error: HttpErrorResponse) {
    console.log(error);
    return of(false);
  }

  /**
   * To get the "root" url of the desired API
   * Example : 'api/products';
   */
  public abstract getRootUrl(urlApp?: string): string;
}