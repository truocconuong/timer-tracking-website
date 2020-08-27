import { environment } from './../../environments/environment';
import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { AuthService } from "./auth.service";
import * as Cookies from "js-cookie";
import _ from 'lodash'
import { isElectron } from '../api/auth/auth.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.indexOf(environment.apiUrl + '/api') > -1) {
      if(request.url !== `${environment.apiUrl}/api/v1/auth/login`){
        let token = Cookies.get(environment.jwtTokenKey);
        if(isElectron()){
          token = window.localStorage.getItem(environment.jwtTokenKey)
        }
        request = request.clone({
          setHeaders: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token,
          }
        });
      }
    }

    // console.log(request, next);
    return next.handle(request);
  }
}
