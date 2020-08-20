import { Component, OnInit } from '@angular/core';
import { AppInjector } from '../../../app-injector';
import { Store } from '../../../store/store.module';
import { CHANGE_PASSWORD_REQUESTED } from './change-password.actions';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public store;
  public data: any = {
    old_password: '',
    password: '',
    confirm_password: ''
  };
  constructor(store: Store) {
    this.store = store.getInstance();
  }

  ngOnInit() {}
  onSubmit() {
    if (this.data.password !== this.data.confirm_password) {
      return false;
    }
    this.store.dispatch({ type: CHANGE_PASSWORD_REQUESTED, data: this.data });
  }
}
