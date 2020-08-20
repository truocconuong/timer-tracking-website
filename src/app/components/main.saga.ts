import { put, fork, takeLatest, select } from 'redux-saga/effects';
import * as _ from 'lodash';
import { FETCH_LOGIN_DETAIL_SUCCEEDED } from './auth/login/login.actions';
import { AppMenunItems } from '../app-menu-items';

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
    data: yield select(state => (state as any).RootReducer.MenuItems),
    user: yield select(state => (state as any).Auth.login.profile),
    levelMenu: action.levelMenu,
    isShowBtnSettings: yield select(state => !(state as any).RootReducer.isShowBtnSettings)
  });
}

function* watchSwapAppMenu() {
  yield takeLatest('SHOW_MENU_BY_LEVEL_REQUESTED', swapAppMenu);
}

export default [watchFetchLoginDetailSuccessed, watchSwapAppMenu];
