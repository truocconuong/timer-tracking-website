import * as _ from 'lodash';
import { ADMIN_EDIT_USER_REQUESTED, RENDER_ADMIN_EDIT_USER_FORM_REQUESTED, removeUserRequested } from './edit.actions';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { InputBase, TextBox, VALIDATOR_REQUIRED } from '@vicoders/reactive-form';
import { BaseComponent } from '../../../../components/base.component';
import { Validators } from '@angular/forms';
import { listUserRouter } from '../user.const';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent extends BaseComponent implements OnInit {
  public reducer: String = 'Admin.User.edit';
  public listUserRouter: Function = listUserRouter;
  constructor(private activatedRoute: ActivatedRoute) {
    super();
    this.activatedRoute = activatedRoute;
  }

  ngOnInit() {
    this.init();
    let inputs: InputBase<any>[] = [
      new TextBox({
        key: 'first_name',
        label: 'First Name',
        required: true,
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
        label: 'Last Name',
        required: true,
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
        key: 'email',
        label: 'Email',
        required: true,
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
        key: 'phone_number',
        label: 'Phone Number',
        required: true,
        classes: ['col-6'],
        group_classes: ['col-12'],
        order: 2,
        validators: []
      }),
      new TextBox({
        key: 'address',
        label: 'Address',
        required: true,
        classes: ['col-12'],
        group_classes: ['col-12'],
        order: 3,
        validators: []
      }),
      new TextBox({
        key: 'company_name',
        label: 'Company',
        required: true,
        classes: ['col-12'],
        group_classes: ['col-12'],
        order: 4,
        validators: []
      })
    ];
    this.dispatch({ type: RENDER_ADMIN_EDIT_USER_FORM_REQUESTED, data: { id: this.activatedRoute.snapshot.params.id, inputs: inputs } });
  }

  public onSubmit = form => {
    if (form.valid) {
      let data = {
        email: form.value.email,
        phone_number: form.value.phone_number,
        first_name: form.value.first_name,
        last_name: form.value.last_name,
        address: form.value.address,
        company_name: form.value.company_name,
        role: this.payload.item.roles[0].slug
      };

      this.dispatch({
        type: ADMIN_EDIT_USER_REQUESTED,
        data: _.assign(data),
        id: this.payload.item.id
      });
    }
    // tslint:disable-next-line:semicolon
  };

  removeUser(item) {
    this.dispatch(removeUserRequested({ id: item.id }));
  }

  mapStateToProps(state) {
    return {
      payload: state.Admin.User.edit
    };
  }

  mapDispatchToProps(dispatch) {
    return {
      dispatch
    };
  }
}
