import { FETCH_ALL_ROLE_REQUESTED } from './roles.actions';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from './../../../app-injector';
import { put, takeEvery, call, select } from 'redux-saga/effects';
import * as _ from 'lodash';
import { FETCH_ALL_ROLE_SUCCEEDED } from './list/list.actions';
import createRoleSaga from './create/create.saga';
import listRoleSaga from './list/list.saga';
import editRoleSaga from './edit/edit.saga';

export function* fetchAllRoles() {
  const fetched = yield select(state => (state as any).Acl.Roles.all.fetched);
  if (!fetched) {
    try {
      const api = AppInjector.get(ApiService);
      let result = yield api.role.list().toPromise();
      return result;
    } catch (e) {
      yield put({ type: API_CALL_ERROR, error: e });
    }
  } else {
    const data = yield select(state => (state as any).Acl.Roles.all.items);
    return data;
  }
}

function* watchFetchAllRoleRequest() {
  yield takeEvery(FETCH_ALL_ROLE_REQUESTED, function*(action: any) {
    const data = yield call(fetchAllRoles);
    yield put({ type: FETCH_ALL_ROLE_SUCCEEDED, component: action.component, data: data });
  });
}

export default [...listRoleSaga, ...createRoleSaga, ...editRoleSaga, watchFetchAllRoleRequest];
