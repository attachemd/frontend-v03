import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
interface PathParams {
  id?: string;
  name?: string;
}
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
   * Gets the list of entities T
   */
  public fetchAll() {
    return this._fetchAll();
  }

  /**
   * Gets an entity T
   * @param id : the required id
   */
  public fetch(pathParams: PathParams) {
    const urlId = this._getUrl(pathParams.id, pathParams.name);

    return this._http
      .get<T>(urlId)
      .pipe(catchError((error) => this._catchError(error)));
  }

  /***
   * PROTECTED
   ****/
  /**
   * Gets the list of entities T
   */
  protected _fetchAll() {
    const url = this._getUrl();

    return this._http
      .get(url)
      .pipe(catchError((error) => of(this._catchError(error))));
  }

  /**
   * Determines the API URL to use, with or without id
   * @param id
   * @param name
   * @protected
   */
  protected _getUrl(id?: string, name?: string) {
    let url = this.getRootUrl();

    if (id) url = `${url}/by_id/${id}`;
    if (name) url = `${url}/by_name/${name}`;

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
