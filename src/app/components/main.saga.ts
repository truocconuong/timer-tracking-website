import { put, fork, takeLatest, select, takeEvery } from 'redux-saga/effects';
import * as _ from 'lodash';
import { FETCH_LOGIN_DETAIL_SUCCEEDED } from './auth/login/login.actions';
import { AppMenunItems } from '../app-menu-items';
import { CHECK_IN, CHECK_OUT } from '../store/action';
import adminSaga from './admin/admin.saga';
import { AppInjector } from '../app-injector';
import { ApiService } from '../api/api.service';

function* initAppMenu(action) {
  const MenuItems = AppMenunItems;
  yield put({
    type: 'INIT_APP_MENU',
    data: MenuItems,
    user: action.data
  });
}

function* watchFetchLoginDetailSuccessed() {
  yield takeLatest(FETCH_LOGIN_DETAIL_SUCCEEDED, initAppMenu);
}

function* swapAppMenu(action) {
  yield put({
    type: 'INIT_APP_MENU',
    data: yield select((state) => (state as any).RootReducer.MenuItems),
    user: yield select((state) => (state as any).Auth.login.profile),
    levelMenu: action.levelMenu,
    isShowBtnSettings: yield select((state) => !(state as any).RootReducer.isShowBtnSettings)
  });
}

function* watchSwapAppMenu() {
  yield takeLatest('SHOW_MENU_BY_LEVEL_REQUESTED', swapAppMenu);
}

function* watchCheckinRequest() {
  const api = AppInjector.get(ApiService);
  yield takeEvery(CHECK_IN, function* (action: any) {
    let result = yield api.work_times.checkin(action.data).toPromise();
    localStorage.setItem('id', JSON.stringify(result.id));
    localStorage.setItem('checkin', JSON.stringify(result.checkin));
  });
}

function* watchCheckoutRequest() {
  const api = AppInjector.get(ApiService);
  yield takeEvery(CHECK_OUT, function* (action: any) {
    const id = JSON.parse(localStorage.getItem('id'));
    const checkin = JSON.parse(localStorage.getItem('checkin'));
    action.data.id = id;
    action.data.checkin = checkin;
    let result = yield api.work_times.checkin(action.data).toPromise();
  });
}

export default [watchCheckinRequest, watchFetchLoginDetailSuccessed, watchSwapAppMenu, watchCheckoutRequest];
