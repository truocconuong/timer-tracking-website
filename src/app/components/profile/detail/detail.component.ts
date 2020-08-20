import { Component, OnInit } from '@angular/core';
import { Store } from './../../../store/store.module';
import * as _ from 'lodash';
import { RENDER_PROFILE_DETAIL_FORM, UPDATE_AVATAR_PROFILE, UPDATE_PROFILE_REQUESTED } from './detail.action';
import { AppInjector } from '../../../app-injector';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public store;

  protected uploading = {
    process: false,
    error: false
  };

  constructor(store: Store) {
    this.store = store.getInstance();
  }

  ngOnInit() {
    this.store.dispatch({ type: RENDER_PROFILE_DETAIL_FORM });
  }

  onSubmit(form) {
    const store = AppInjector.get(Store).getInstance();
    if (form.valid) {
      if (form.value.hasOwnProperty('phone_data')) {
        let data = {
          phone_number: form.value.phone_data.value,
          phone_area_code: form.value.phone_data.code
        };
        _.assign(form.value, data);
      }
      store.dispatch({
        type: UPDATE_PROFILE_REQUESTED,
        data: form.value
      });
    }
  }

  completeUpload($event) {
    if (_.isEmpty(this.store.getState().Auth.login.profile.images.data)) {
      let item = {
        id: 1,
        type: 'avatar',
        url: $event.response.data[0].full_path
      };
      this.store.getState().Auth.login.profile.images.data.push(item);
    } else {
      this.store.getState().Auth.login.profile.images.data[0].url = $event.response.data[0].full_path;
    }
  }

  errorUploadAvatar($event) {
    console.log('error', $event);
  }

  updateAvatar() {
    let data = {
      type: 'avatar',
      url: this.store.getState().Auth.login.profile.images.data[0] ? this.store.getState().Auth.login.profile.images.data[0].url : 'assets/images/user-card/img-round2.jpg'
    };
    this.store.dispatch({ type: UPDATE_AVATAR_PROFILE, data: data });
  }
}
