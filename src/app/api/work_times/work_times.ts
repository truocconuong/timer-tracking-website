import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';

import * as _ from 'lodash';
import { ApiUrl } from '../api-url.service';
import { Observable } from 'rxjs';
import { AppInjector } from '../../app-injector';

import { Response } from '@angular/http';
import axios from 'axios';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import * as Cookies from 'js-cookie';
import { isElectron } from '../auth/auth.service';
import * as moment from 'moment';

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
      tap((result) => {
        return result;
      })
    );
  }

  getAllWorkTimes(): Observable<any> {
    return this.http.get(this.apiUrl.getApiUrl(this.url)).pipe(
      tap((result) => {
        return result;
      })
    );
  }

  upload(params?: {}) {
    const urlUpload = environment.urlCallback;
    let resultData;
    resultData = axios
    .post(`${urlUpload}/api/v1/upload`, params, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((dulieu) => {
      const url = dulieu.data.data[0].full_path;
      let urls: any = window.localStorage.getItem('urls');
      if (_.isNil(urls)) {
        urls = [];
      } else {
        urls = JSON.parse(urls);
      }
      urls.push(url);
      window.localStorage.setItem('urls', JSON.stringify(urls));
    });
    return resultData;
  }

  fakeUploadDocument(params?: {}) {
    const urlUpload = environment.urlCallback;
    // login
    let resultData;
    const data = {
      email: environment.email,
      password: environment.password
    };
    const login = axios.post(`${urlUpload}/api/v1/auth/login`, data).then((result: any) => {
      // upload
      const access_token = `Bearer ${result.data.access_token}`;
      resultData = axios
        .post(`${urlUpload}/api/v1/upload`, params, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: access_token
          }
        })
        .then((dulieu) => {
          const url = dulieu.data.data[0].full_path;
          let token = Cookies.get(environment.jwtTokenKey);
          if (isElectron()) {
            token = window.localStorage.getItem(environment.jwtTokenKey);
          }
          const calldata = axios.post(
            `${environment.apiUrl}/api/v1/documents`,
            { url: url, checkin: moment() },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              }
            }
          );
        });
    });
    return resultData;
  }
}
