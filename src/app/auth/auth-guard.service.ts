import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import * as _ from 'lodash';
import { loginRouter } from '../app.const';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      console.log(loginRouter());
      this.router.navigate(loginRouter(), {
        queryParams: {
          redirect: encodeURIComponent(document.location.pathname),
          search: encodeURIComponent(document.location.search)
        }
      });
      return false;
    }
    return true;
  }
}
