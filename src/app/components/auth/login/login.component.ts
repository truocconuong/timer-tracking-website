import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../common/services/notification/notification.service';
import * as Cookies from 'js-cookie';
import * as _ from 'lodash';
import { AuthComponent } from '../auth.component';
import { environment } from '../../../../environments/environment';
import { Store } from './../../../store/store.module';
import { LOGIN_REQUESTED, FETCH_LOGIN_DETAIL_REQUESTED } from './login.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends AuthComponent implements OnInit {
  public store;
  public redirectUrl = 'product';
  user = {
    username: '',
    password: ''
  };
  constructor(private router: Router, private _activatedRoute: ActivatedRoute, private notification: NotificationService, store: Store) {
    super();
    this.store = store.getInstance();
    _activatedRoute.queryParams.subscribe(params => {
      if (!_.isUndefined(params.url)) {
        this.redirectUrl = params.url;
      }
    });
  }

  ngOnInit() {}

  onSubmit() {
    let data = {
      username: this.user.username,
      password: this.user.password
    };
    this.store.dispatch({ type: LOGIN_REQUESTED, data: data });
  }
}
