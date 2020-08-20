import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { InputBase, TextBox, VALIDATOR_REQUIRED, Dropdown } from '@vicoders/reactive-form';
import { listUserRouter } from '../user.const';
import { AppInjector } from '../../../../app-injector';
import { NotificationService } from '../../../../common/services/notification/notification.service';
import { RENDER_CREATE_FORM_ADMIN_USER_REQUESTED, CREATE_ADMIN_USER_REQUESTED } from './create.actions';
import { BaseComponent } from '../../../base.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {
  public reducer: String = 'Admin.User.create';
  public listUserRouter: Function = listUserRouter;

  ngOnInit() {
    this.init();
    let inputs: InputBase<any>[] = [
      new TextBox({
        key: 'first_name',
        label: 'First Name *',
        classes: ['col-6'],
        group_classes: ['col-12'],
        order: 1,
        validators: [
          {
            label: VALIDATOR_REQUIRED,
            validator: Validators.required,
            message: 'This field is required'
          }
        ]
      }),
      new TextBox({
        key: 'last_name',
        label: 'Last Name *',
        classes: ['col-6'],
        group_classes: ['col-12'],
        order: 1,
        validators: [
          {
            label: VALIDATOR_REQUIRED,
            validator: Validators.required,
            message: 'This field is required'
          }
        ]
      }),
      new TextBox({
        key: 'password',
        type: 'password',
        label: 'Password *',
        classes: ['col-6'],
        group_classes: ['col-12'],
        order: 2,
        validators: [
          {
            label: VALIDATOR_REQUIRED,
            validator: Validators.required,
            message: 'This field is required'
          }
        ]
      }),
      new TextBox({
        key: 're_password',
        type: 'password',
        label: 'Password confirmation *',
        classes: ['col-6'],
        group_classes: ['col-12'],
        order: 2,
        validators: [
          {
            label: VALIDATOR_REQUIRED,
            validator: Validators.required,
            message: 'This field is required'
          }
        ]
      }),
      new TextBox({
        key: 'email',
        label: 'Email *',
        classes: ['col-6'],
        group_classes: ['col-12'],
        order: 3,
        validators: [
          {
            label: VALIDATOR_REQUIRED,
            validator: Validators.required,
            message: 'This field is required'
          }
        ]
      }),
      new TextBox({
        key: 'phone_number',
        label: 'Phone Number',
        classes: ['col-6'],
        group_classes: ['col-12'],
        order: 3,
        validators: []
      }),
      new TextBox({
        key: 'address',
        label: 'Address',
        classes: ['col-12'],
        group_classes: ['col-12'],
        order: 4,
        validators: []
      }),
      new TextBox({
        key: 'company_name',
        label: 'Company',
        classes: ['col-12'],
        group_classes: ['col-12'],
        order: 5,
        validators: []
      }),
      new Dropdown({
        key: 'role',
        label: 'Role',
        classes: ['col-12'],
        group_classes: ['col-12'],
        order: 6,
        validators: [
          {
            label: VALIDATOR_REQUIRED,
            validator: Validators.required,
            message: 'This field is required'
          }
        ]
      })
    ];

    this.dispatch({ type: RENDER_CREATE_FORM_ADMIN_USER_REQUESTED, data: { inputs: inputs } });
  }

  public onSubmit = (form) => {

    if (form.value.password !== form.value.re_password) {
      AppInjector.get(NotificationService).show('warning', 'Password does not match', 3000);
      return false;
    }

    if (form.valid) {
      let data = {
        first_name: form.value.first_name,
        last_name: form.value.last_name,
        email: form.value.email,
        phone_number: form.value.phone_number,
        password: form.value.password,
        address: form.value.address,
        company: form.value.company
      };

      this.dispatch({ type: CREATE_ADMIN_USER_REQUESTED, data: data });
    }
  // tslint:disable-next-line:semicolon
  };

  mapStateToProps(state) {
    return {
      payload: state.Admin.User.create
    };
  }

  mapDispatchToProps(dispatch) {
    return {
      dispatch
    };
  }
}
