import { API_CALL_ERROR } from '../../../../store/action';
import { PreloaderService } from '../../../../common/services/preloader/preloader.service';
import { USER_COMP } from '../user.const';
import { AppInjector } from '../../../../app-injector';
import {
  FETCH_ALL_USER_REQUESTED,
  FETCH_ALL_USER_SUCCEEDED,
  UPDATE_ADMIN_USER_STATUS_REQUESTED,
  updateUserStatusSuccessed,
  UPDATE_ADMIN_USER_STATUS_SUCCEEDED
} from './list.actions';
import { takeEvery, put } from 'redux-saga/effects';
import { ApiService } from '../../../../api/api.service';
import * as _ from 'lodash';
import { NotificationService } from '../../../../common/services/notification/notification.service';

function* watchFetchAllUserRequested() {
  yield takeEvery(FETCH_ALL_USER_REQUESTED, function*(action: any) {
    try {
      AppInjector.get(PreloaderService).show();
      const results = yield AppInjector.get(ApiService)
        .admin.user.getAllUser()
        .toPromise();
      AppInjector.get(PreloaderService).hide();
      yield put({ type: FETCH_ALL_USER_SUCCEEDED, users: results});
    } catch (e) {
      AppInjector.get(PreloaderService).hide();
      yield put({ type: API_CALL_ERROR, error: e });
    }
  });
}

function* watchChangeUserRequested() {
  yield takeEvery(UPDATE_ADMIN_USER_STATUS_REQUESTED, function*(action: any) {
    try {
      AppInjector.get(PreloaderService).show();
      const result = yield AppInjector.get(ApiService)
        .admin.user.changeStatus(action.data.id, { status: action.data.status })
        .toPromise();
      yield put(updateUserStatusSuccessed({ data: result }));
    } catch (e) {
      yield put({ type: API_CALL_ERROR, error: e });
    }
  });
}

function* watchChangeUserSuccessed() {
  yield takeEvery(UPDATE_ADMIN_USER_STATUS_SUCCEEDED, function*(action: any) {
    AppInjector.get(PreloaderService).hide();
    AppInjector.get(NotificationService).show('success', 'User status is updated', 3000);
  });
}

export default [watchFetchAllUserRequested, watchChangeUserRequested, watchChangeUserSuccessed];
