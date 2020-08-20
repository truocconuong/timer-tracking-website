import { ApiUrl } from './api-url.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import * as _ from 'lodash';
import LengthAwarePaginator from '../models/LengthAwarePaginator';
import { PreloaderService } from '../common/services/preloader/preloader.service';
import { AppInjector } from '../app-injector';

export class ServiceProvider {
  public url = '';
  public model;
  public http;
  public apiUrl;
  public preloader;

  constructor() {
    this.http = AppInjector.get(HttpClient);
    this.apiUrl = AppInjector.get(ApiUrl);
    this.preloader = AppInjector.get(PreloaderService);
  }
  /**
   * Get list of all resource with pagination
   *
   * @param param Optinal
   *
   * @return Observable
   */
  get(params: {}): Observable<any> {
    this.preloader.show();
    const queryParams = new HttpParams({ fromObject: params });
    return this.http.get(this.apiUrl.getApiUrl(this.url), { params: queryParams }).pipe(
      tap(result => {
        this.preloader.hide();
      }),
      map(result =>
        _.assign(
          {},
          {
            items: (result as any).data.map(item => new this.model(item)),
            pagination: new LengthAwarePaginator((result as any).meta.pagination)
          }
        )
      ),
      catchError(error => {
        this.preloader.hide();
        throw error;
      })
    );
  }

  /**
   * Get list of all resource
   *
   * @param params Optional
   *
   * @return Observable
   */
  list(params = {}): Observable<any> {
    this.preloader.show();
    return this.http.post(this.apiUrl.getApiUrl(`${this.url}/list`), params).pipe(
      tap(result => {
        this.preloader.hide();
      }),
      map(result => _.map((result as any).data, item => new this.model(item))),
      catchError(error => {
        this.preloader.hide();
        throw error;
      })
    );
  }

  /**
   * Update resource by given id
   *
   * @param Object
   *
   * @return Observable
   */
  update(id, data): Observable<any> {
    this.preloader.show();
    return this.http.put(this.apiUrl.getApiUrl(this.url) + '/' + id, data).pipe(
      tap(result => {
        this.preloader.hide();
      }),
      map(result => new this.model((result as any).data)),
      catchError(error => {
        this.preloader.hide();
        throw error;
      })
    );
  }

  /**
   * Delete resource by given id
   *
   * @param id
   *
   * @return Observable
   */
  delete(id): Observable<any> {
    this.preloader.show();
    return this.http.delete(this.apiUrl.getApiUrl(this.url) + '/' + id).pipe(
      tap(result => {
        this.preloader.hide();
      }),
      catchError(error => {
        this.preloader.hide();
        throw error;
      })
    );
  }

  create(data): Observable<any> {
    this.preloader.show();
    return this.http.post(this.apiUrl.getApiUrl(this.url), data).pipe(
      tap(result => {
        this.preloader.hide();
      }),
      map(result => new this.model((result as any).data)),
      catchError(error => {
        this.preloader.hide();
        throw error;
      })
    );
  }

  getItemById(id, params?): Observable<any> {
    this.preloader.show();
    params = params || {};
    const queryParams = new HttpParams({ fromObject: params });
    return this.http.get(this.apiUrl.getApiUrl(this.url) + '/' + id, { params: queryParams }).pipe(
      tap(result => {
        this.preloader.hide();
      }),
      map(result => new this.model((result as any).data)),
      catchError(error => {
        this.preloader.hide();
        throw error;
      })
    );
  }
}
