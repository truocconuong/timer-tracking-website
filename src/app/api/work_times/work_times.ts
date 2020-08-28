import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';

import * as _ from 'lodash';
import { ApiUrl } from '../api-url.service';
import { Observable } from 'rxjs';
import { AppInjector } from '../../app-injector';

import { Response } from '@angular/http';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class WorkTimeService {
  private url = '/api/v1/work-times';
  http: HttpClient;
  apiUrl: ApiUrl;

  constructor() {
    this.http = AppInjector.get(HttpClient);
    this.apiUrl = AppInjector.get(ApiUrl);
  }

  checkin(data): Observable<any> {
    return this.http.post(this.apiUrl.getApiUrl(this.url), data).pipe(
      tap(result => {
        return result
      }),
    );
  }


  getAllWorkTimes(): Observable<any> {
    return this.http.get(this.apiUrl.getApiUrl(this.url)).pipe(
      tap(result => {
        return result
      })
    );
  }
  
}
