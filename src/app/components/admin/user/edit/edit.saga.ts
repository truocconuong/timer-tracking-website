import { Router } from '@angular/router';
import * as _ from 'lodash';
import {
  DELETE_ADMIN_USER_REQUESTED,
  GET_ADMIN_USER_DETAIL_REQUESTED,
  GET_ADMIN_USER_DETAIL_SUCCESSED,
  ADMIN_EDIT_USER_REQUESTED,
  RENDER_ADMIN_EDIT_USER_FORM_REQUESTED,
  FILL_ADMIN_USER_DETAIL_FORM
} from './edit.actions';
import { takeEvery, put, takeLatest, all, call } from 'redux-saga/effects';
import { API_CALL_ERROR } from '../../../../store/action';
import { ApiService } from '../../../../api/api.service';
import { AppInjector } from '../../../../app-injector';
import { listUserRouter } from '../user.const';
import { fetchAllRoles } from '../../../acl/roles/roles.saga';
import { NotificationService } from '../../../../common/services/notification/notification.service';

function* watchEditUserRequest() {
  yield takeEvery(ADMIN_EDIT_USER_REQUESTED, function*(action: any) {
    try {
      let result = yield AppInjector.get(ApiService)
        .admin.user.update(action.id, action.data)
        .toPromise();
      AppInjector.get(Router).navigate(listUserRouter());
    } catch (e) {
      yield put({ type: API_CALL_ERROR, error: e });
    }
  });
}

export function* fetchAdminUserDetail(id, params?) {
  return yield AppInjector.get(ApiService)
    .admin.user.getItemById(id, params)
    .toPromise();
}

function* watchGetUserRequest() {
  yield takeEvery(GET_ADMIN_USER_DETAIL_REQUESTED, function*(action: any) {
    try {
      const [user, roles] = yield all([call(fetchAdminUserDetail, action.data, { includes: 'roles' }), call(fetchAllRoles)]);
      yield put({ type: GET_ADMIN_USER_DETAIL_SUCCESSED, data: { user, roles } });
    } catch (e) {
      yield put({ type: API_CALL_ERROR, error: e });
    }
  });
}

function* watchDeleteUserRequest() {
  yield takeEvery(DELETE_ADMIN_USER_REQUESTED, function*(action: any) {
    try {
      yield AppInjector.get(ApiService)
        .admin.user.delete(action.data.id)
        .toPromise();
      AppInjector.get(NotificationService).show('success', 'User is deleted', 3000);
      AppInjector.get(Router).navigate(listUserRouter());
    } catch (e) {
      yield put({ type: API_CALL_ERROR, error: e });
    }
  });
}

function* watchRenderManagerDetailFormRequested() {
  yield takeLatest(RENDER_ADMIN_EDIT_USER_FORM_REQUESTED, function*(action: any) {
    yield put({ type: GET_ADMIN_USER_DETAIL_REQUESTED, data: action.data.id });
  });
}

function* watchFetchManagerDetailSuccessed() {
  yield takeLatest(GET_ADMIN_USER_DETAIL_SUCCESSED, function*(action: any) {
    yield put({ type: FILL_ADMIN_USER_DETAIL_FORM, data: action.data.user });
  });
}

export default [watchEditUserRequest, watchGetUserRequest, watchDeleteUserRequest, watchRenderManagerDetailFormRequested, watchFetchManagerDetailSuccessed];
