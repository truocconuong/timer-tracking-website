import { Injectable } from '@angular/core';
import { ServiceProvider } from '../../../api/service.provider';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import User from '../../../models/User';

@Injectable()
export class DocumentService extends ServiceProvider {
  public url = '/api/v1/documents';
  public model = User;

  getAllDocument(): Observable<any> {
    this.preloader.show();
    return this.http.get(this.apiUrl.getApiUrl(this.url)).pipe(
      tap((result) => {
        return result;
      })
    );
  }

}
