import * as _ from 'lodash';
import { CREATE_ADMIN_USER_REQUESTED, CREATE_ADMIN_USER_SUCCESSED, RENDER_CREATE_FORM_ADMIN_USER_REQUESTED, UPDATE_ADMIN_USER_INPUT_OPTION } from './create.actions';
import { Router } from '@angular/router';
import { put, takeEvery, takeLatest, call } from 'redux-saga/effects';
import { API_CALL_ERROR } from '../../../../store/action';
import { ApiService } from '../../../../api/api.service';
import { AppInjector } from '../../../../app-injector';

import { listUserRouter } from '../user.const';

import { fetchAllRoles } from '../../../acl/roles/roles.saga';

function* watchCreateAdminUserRequest() {
  yield takeEvery(CREATE_ADMIN_USER_REQUESTED, function*(action: any) {
    const router = AppInjector.get(Router);
    try {
      let result = yield AppInjector.get(ApiService)
        .admin.user.create(action.data)
        .toPromise();
      yield put({ type: CREATE_ADMIN_USER_SUCCESSED, data: result });
      router.navigate(listUserRouter());
    } catch (e) {
      yield put({ type: API_CALL_ERROR, error: e });
    }
  });
}

function* watchAdminCreateUserFormRender() {
  yield takeLatest(RENDER_CREATE_FORM_ADMIN_USER_REQUESTED, function*() {
    const roles = yield call(fetchAllRoles);
    yield put({
      type: UPDATE_ADMIN_USER_INPUT_OPTION,
      input: 'role',
      data: _.map(roles, (item, key) => _.assign(item, { value: item.slug, label: item.name, selected: Number(key) === 0 }))
    });
  });
}
export default [watchCreateAdminUserRequest, watchAdminCreateUserFormRender];
