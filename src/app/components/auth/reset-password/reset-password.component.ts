import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from './../../../store/store.module';
import { RESET_PASSWORD_REQUESTED } from './reset-password.actions';
import { NotificationService } from '../../../common/services/notification/notification.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public store;
  public data: any = {
    password: '',
    password_confirmation: ''
  };

  constructor(private notification: NotificationService, private route: ActivatedRoute, store: Store) {
    this.store = store.getInstance();
  }

  ngOnInit() {}

  onSubmit() {
    this.route.queryParams.subscribe(params => {
      let token = params.token;

      if (_.isEmpty(params)) {
        this.notification.show('warning', 'Token is invalid', 3000);
        return false;
      }

      if (this.data.password === '' || this.data.password_confirmation === '') {
        // this.notification.show('warning', 'Password is required', 3000);
        return false;
      }

      if (this.data.password !== this.data.password_confirmation) {
        // this.notification.show('warning', 'Password does not match', 3000);
        return false;
      }

      let data = {
        password: this.data.password,
        token: token
      };
      this.store.dispatch({ type: RESET_PASSWORD_REQUESTED, data: data });
    });
  }
}
