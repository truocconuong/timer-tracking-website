import { Injectable } from '@angular/core';
import { ServiceProvider } from '../../../api/service.provider';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import User from '../../../models/User';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserService extends ServiceProvider {
  public url = '/api/admin/users';
  public model = User;

  changeStatus(id, params): Observable<any> {
    return this.http.put(`${this.apiUrl.getApiUrl(this.url)}/${id}/status`, params).pipe(
      map(result => {
        return new User((result as any).data);
      }),
      catchError(error => {
        throw error;
      })
    );
  }

  attachRoleToUser(userId, roleId): Observable<any> {
    return this.http
      .put(this.apiUrl.getApiUrl(this.url) + `/${userId}/role`, {
        role_id: roleId
      })
      .pipe(
        tap(result => {}),
        catchError(error => {
          throw error;
        })
      );
  }

  detachRoleFromUser(data): Observable<any> {
    return this.http.delete(this.apiUrl.getApiUrl(this.url) + `/${data.userId}/role/${data.roleId}`).pipe(
      tap(result => {}),
      catchError(error => {
        throw error;
      })
    );
  }

  saveRoleUser(userId, roles): Observable<any> {
    return this.http.put(this.apiUrl.getApiUrl(this.url) + `/${userId}/roles`, roles).pipe(
      tap(result => {}),
      catchError(error => {
        throw error;
      })
    );
  }
}