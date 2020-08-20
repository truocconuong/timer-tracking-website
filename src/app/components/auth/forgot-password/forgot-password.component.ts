import { Component, OnInit } from '@angular/core';
import { Store } from './../../../store/store.module';
import { FORGOT_PASSWORD_REQUESTED } from './forgot-password.actions';
import { NotificationService } from '../../../common/services/notification/notification.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public store;
  public email = '';
  public data: any = {
    email: ''
  };
  constructor(private notification: NotificationService, store: Store) {
    this.store = store.getInstance();
  }

  ngOnInit() {}

  onSubmit() {
    if (this.data.email === '') {
      this.notification.show('warning', 'Email is required', 3000);
      return false;
    }
    this.store.dispatch({ type: FORGOT_PASSWORD_REQUESTED, data: this.data });
  }
}
