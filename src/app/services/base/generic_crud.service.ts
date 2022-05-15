import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
interface PathParams {
  id?: string;
  name?: string;
}
/**
 * CrudGeneric : provision of CRUD on a type T
 */
@Injectable({ providedIn: 'root' })
// FIXME GeneriCRUD to GenericCRUD
export abstract class GeneriCRUD<T> {
  protected constructor(private _http: HttpClient) {}

  /**
   * Creation of an entity of type T, in POST
   * @param object : the object to create
   */
  public create(object: T, action?: string) {
    const url = this._getUrl('', '', action);

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
   * Update of a T entity, in PUT
   * @param object The object to be modified
   * @param key Allows (optional) to specify the key priority of the object to modify, by default 'id'.
   */
  public update(object: any, key: string = 'id') {
    // this.loadingSubject.next(true);
    console.log('update');

    const url = this._getUrl(object[key]);

    return this._http.put(url, object).pipe(
      finalize(() => {
        // this.clearCache();
        // this.loadingSubject.next(false);
      }),
      catchError((error) => this._catchError(error))
    );
  }

  /**
   * update or create depending on an entity's id (0 or > 0)
   * @param object
   * @param key
   */
  public updateOrCreate(object: any, key: string = 'id'): Observable<any> {
    return key in object && object[key]
      ? this.update(object, key)
      : this.create(object);
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
  public fetch(pathParams: PathParams): Observable<any> {
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
  protected _getUrl(id?: string, name?: string, action?: string) {
    let url = this.getRootUrl();

    if (id) url = `${url}/${id}`;
    if (name) url = `${url}/by_name/${name}`;
    if (action) url = `${url}/${action}`;

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
