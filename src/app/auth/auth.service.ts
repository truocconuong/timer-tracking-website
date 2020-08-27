import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as Cookies from 'js-cookie';
import { environment } from '../../environments/environment';
import { isElectron } from '../api/auth/auth.service';

@Injectable()
export class AuthService {
  constructor() {}
  public isAuthenticated(): boolean {
    let token = Cookies.get(environment.jwtTokenKey);
        if(isElectron()){
          token = window.localStorage.getItem(environment.jwtTokenKey)
        }
    return !_.isNil(token);
  }
}
