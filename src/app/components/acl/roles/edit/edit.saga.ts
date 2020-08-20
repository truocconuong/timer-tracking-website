import { NotificationService } from './../../../../common/services/notification/notification.service';
import { API_CALL_ERROR } from './../../../../store/action';
import { ApiService } from './../../../../api/api.service';
import { AppInjector } from './../../../../app-injector';
import { takeLatest, put, takeEvery } from 'redux-saga/effects';
import {
  FETCH_ROLE_DETAIL_SUCCEEDED,
  FETCH_ALL_PERMISSIONS_GROUP_SUCCEEDED,
  FETCH_ALL_PERMISSIONS_GROUP_REQUESTED,
  FETCH_ROLE_DETAIL_REQUESTED,
  SET_PERMISSIONS_ROLE_REQUESTED,
  DETACH_PERMISSION_ROLE_REQUESTED
} from './edit.actions';
import { ROLE_COMP } from '../roles.const';
import * as _ from 'lodash';
import { PreloaderService } from '../../../../common/services/preloader/preloader.service';

function* getRole(action) {
  const api = AppInjector.get(ApiService);
  try {
    const result = yield api.role.getItemById(action.data).toPromise();

    if (!_.isUndefined(action.com)) {
      switch (action.com) {
        case ROLE_COMP:
          yield put({ type: FETCH_ROLE_DETAIL_SUCCEEDED, data: result });
          yield put({ type: FETCH_ALL_PERMISSIONS_GROUP_REQUESTED, com: ROLE_COMP });
          break;

        default:
          break;
      }
    }
  } catch (e) {}
}

function* watchFetchRoleDetailRequest() {
  yield takeEvery(FETCH_ROLE_DETAIL_REQUESTED, getRole);
}

function* fecthAllPermissionsGroup(action) {
  try {
    const results = yield AppInjector.get(ApiService)
      .permission.getAllPermissionsGroup()
      .toPromise();

    if (!_.isUndefined(action.com)) {
      switch (action.com) {
        case ROLE_COMP:
          yield put({ type: FETCH_ALL_PERMISSIONS_GROUP_SUCCEEDED, data: results });
          break;

        default:
          break;
      }
    } else {
    }
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchFetchRoleDetailSuccess() {
  yield takeEvery(FETCH_ALL_PERMISSIONS_GROUP_REQUESTED, fecthAllPermissionsGroup);
}

function* setPermissionsRole(action) {
  try {
    AppInjector.get(PreloaderService).show();
    const result = yield AppInjector.get(ApiService)
      .role.setAllPermissionsRole(action.data.roleId, action.data.permissions)
      .toPromise();

    if (!_.isUndefined(action.com)) {
      switch (action.com) {
        case ROLE_COMP:
          AppInjector.get(NotificationService).show('success', 'Set Role Permission successfully', 3000);
          yield put({
            type: FETCH_ROLE_DETAIL_REQUESTED,
            com: ROLE_COMP,
            data: action.data.roleId
          });
          break;

        default:
          break;
      }
    } else {
    }
    AppInjector.get(PreloaderService).hide();
  } catch (e) {
    AppInjector.get(PreloaderService).hide();
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchSetPermissionsRoleRequest() {
  yield takeEvery(SET_PERMISSIONS_ROLE_REQUESTED, setPermissionsRole);
}

function* detachPemission(action) {
  try {
    const results = yield AppInjector.get(ApiService)
      .role.detach(action.data.roleId, action.data.permission)
      .toPromise();

    if (!_.isUndefined(action.com)) {
      switch (action.com) {
        case ROLE_COMP:
          yield put({
            type: FETCH_ROLE_DETAIL_REQUESTED,
            com: ROLE_COMP,
            data: action.data.roleId
          });
          break;

        default:
          break;
      }
    } else {
    }
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchDetachPermissionRoleRequest() {
  yield takeEvery(DETACH_PERMISSION_ROLE_REQUESTED, detachPemission);
}

export default [watchFetchRoleDetailRequest, watchFetchRoleDetailSuccess, watchSetPermissionsRoleRequest, watchDetachPermissionRoleRequest];
