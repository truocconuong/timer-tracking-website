import { put, fork, takeLatest, select, takeEvery } from 'redux-saga/effects';
import * as _ from 'lodash';
import { FETCH_LOGIN_DETAIL_SUCCEEDED } from './auth/login/login.actions';
import { AppMenunItems } from '../app-menu-items';
import { CHECK_IN, CHECK_OUT, GET_ALL_WORKTIME_USER_REQUESTED, GET_ALL_WORKTIME_USER_SUCCESSED, SCREEN_DESKTOP } from '../store/action';
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
  yield put({ type: GET_ALL_WORKTIME_USER_REQUESTED, user_id: action.data.id });
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
    const urls = window.localStorage.getItem('urls');
    if (!_.isNil(urls)) {
      action.data.urls = urls;
      window.localStorage.removeItem('urls');
    }
    let result = yield api.work_times.checkin(action.data).toPromise();
    yield put({ type: GET_ALL_WORKTIME_USER_REQUESTED, user_id: action.user_id });
  });
}

function* watchFetchAllWorkTimeRequested() {
  const api = AppInjector.get(ApiService);
  yield takeEvery(GET_ALL_WORKTIME_USER_REQUESTED, function* (action: any) {
    let result = yield api.work_times.getAllWorkTimes().toPromise();
    yield put({ type: GET_ALL_WORKTIME_USER_SUCCESSED, data: result, user_id: action.user_id });
  });
}

function* watchScreenRequest() {
  const api = AppInjector.get(ApiService);
  yield takeEvery(SCREEN_DESKTOP, function* (action: any) {
    let result = yield api.work_times.upload(action.data).toPromise();
    const url = result.data[0].full_path;
    let urls: any = window.localStorage.getItem('urls');
    if (_.isNil(urls)) {
      urls = [];
    } else {
      urls = JSON.parse(urls);
    }
    urls.push(url);
    window.localStorage.setItem('urls', JSON.stringify(urls));
  });
}

export default [watchScreenRequest, watchFetchAllWorkTimeRequested, watchCheckinRequest, watchFetchLoginDetailSuccessed, watchSwapAppMenu, watchCheckoutRequest];
