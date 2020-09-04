import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrl } from '../api-url.service';
import { Observable } from 'rxjs/Observable';
import { tap, catchError, map } from 'rxjs/operators';
export function isElectron() {
  let isElectron = false
  var userAgent = navigator.userAgent.toLowerCase();
  console.log(userAgent)
    if (userAgent.indexOf('linux;') > -1) { 
      isElectron = true
    }
    return isElectron;
}
@Injectable()
export class AuthService {
  protected url = '/api/v1/auth';

  constructor(private http: HttpClient, private apiUrl: ApiUrl) {}

  profile(): Observable<any> {
    const meUrl = '/api/v1/me/profile';
    return this.http.get(this.apiUrl.getApiUrl(meUrl));
  }

  login(data): Observable<any> {
    return this.http.post(this.apiUrl.getApiUrl(this.url) + '/login', data).pipe(
      tap((result) => {}),
      catchError((error) => {
        throw error;
      })
    );
  }

  resetPassword(data): Observable<any> {
    return this.http.post(this.apiUrl.getApiUrl(this.url) + '/reset-password', data).pipe(
      tap((result) => {}),
      catchError((error) => {
        throw error;
      })
    );
  }

  forgotPassword(data): Observable<any> {
    return this.http.post(this.apiUrl.getApiUrl(this.url) + '/forgot-password', data).pipe(
      tap((result) => {}),
      catchError((error) => {
        throw error;
      })
    );
  }

  updateAvatar(data): Observable<any> {
    return this.http.post(this.apiUrl.getApiUrl('/api/v1/me/images'), data).pipe(
      tap((result) => {}),
      catchError((error) => {
        throw error;
      })
    );
  }

  updateProfile(data): Observable<any> {
    return this.http.put(this.apiUrl.getApiUrl('/api/v1/me/profile'), data).pipe(
      tap((result) => {}),
      catchError((error) => {
        throw error;
      })
    );
  }

  checkPassword(data): Observable<any> {
    return this.http.put(this.apiUrl.getApiUrl('/api/v1/me/check-password'), data).pipe(
      tap((result) => {}),
      catchError((error) => {
        throw error;
      })
    );
  }

  changePassword(data): Observable<any> {
    return this.http.put(this.apiUrl.getApiUrl('/api/v1/me/password'), data).pipe(
      tap((result) => {}),
      catchError((error) => {
        throw error;
      })
    );
  }
}
