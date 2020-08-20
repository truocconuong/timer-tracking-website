import { NotificationService } from './../../../../common/services/notification/notification.service';
import { PreloaderService } from './../../../../common/services/preloader/preloader.service';
import { API_CALL_ERROR } from './../../../../store/action';
import { ApiService } from './../../../../api/api.service';
import { AppInjector } from './../../../../app-injector';
import { takeEvery, put } from 'redux-saga/effects';
import { DELETE_ROLE_REQUESTED } from './list.actions';
import * as _ from 'lodash';
import { Router } from '@angular/router';

function* deleteRole(action) {
  try {
    AppInjector.get(PreloaderService).show();
    const result = yield AppInjector.get(ApiService)
      .role.delete(action.data.getId())
      .toPromise();
    if (!_.isUndefined(action.com)) {
    } else {
    }
    AppInjector.get(PreloaderService).hide();
    AppInjector.get(NotificationService).show('success', 'Role deleted', 3000);
    AppInjector.get(Router).navigate(['/acl/roles']);
  } catch (e) {
    AppInjector.get(PreloaderService).hide();
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchDeleteRoleRequest() {
  yield takeEvery(DELETE_ROLE_REQUESTED, deleteRole);
}

export default [watchDeleteRoleRequest];
