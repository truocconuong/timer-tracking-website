import { Router } from '@angular/router';
import { NotificationService } from './../../../../common/services/notification/notification.service';
import { API_CALL_ERROR } from './../../../../store/action';
import { ApiService } from './../../../../api/api.service';
import { AppInjector } from './../../../../app-injector';
import { put, takeEvery } from 'redux-saga/effects';
import { CREATE_ROLE_REQUESTED, CREATE_ROLE_SUCCEEDED } from './create.actions';
import * as _ from 'lodash';
import { PreloaderService } from '../../../../common/services/preloader/preloader.service';

function* createRole(action) {
  try {
    AppInjector.get(PreloaderService).show();
    const result = yield AppInjector.get(ApiService)
      .role.create(action.data)
      .toPromise();

    if (!_.isUndefined(action.com)) {
      switch (action.com) {
        default:
          break;
      }
    } else {
        yield put({ type: CREATE_ROLE_SUCCEEDED, data: result });
        AppInjector.get(NotificationService).show('success', 'Role created', 3000);
        AppInjector.get(Router).navigate(['/acl/roles']);
    }
    AppInjector.get(PreloaderService).hide();
  } catch (e) {
    AppInjector.get(PreloaderService).hide();
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchCreateRoleRequest() {
  yield takeEvery(CREATE_ROLE_REQUESTED, createRole);
}

export default [watchCreateRoleRequest];
