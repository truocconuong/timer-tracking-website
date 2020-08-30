import { Router, ActivatedRoute } from '@angular/router';
import { API_CALL_ERROR } from './../../../store/action';
import { AppInjector } from './../../../app-injector';
import { takeEvery, put, takeLatest, select, call } from 'redux-saga/effects';
import {
  LOGIN_REQUESTED,
  LOGIN_SUCCEEDED,
  FETCH_LOGIN_DETAIL_REQUESTED,
  FETCH_LOGIN_DETAIL_SUCCEEDED,
  fetchLoginDetailRequested,
  fetchLoginDetailSuccessed
} from './login.actions';
import { ApiService } from '../../../api/api.service';
import * as Cookies from 'js-cookie';
import { environment } from '../../../../environments/environment';
import { NotificationService } from '../../../common/services/notification/notification.service';
import * as _ from 'lodash';
import { isElectron } from './../../../../app/api/auth/auth.service';

function parseQuery(queryString) {
  let query = {};
  let pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  for (let i = 0; i < pairs.length; i++) {
    let pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}

function* watchLoginRequest() {
  yield takeEvery(LOGIN_REQUESTED, function*(action: any) {
    try {
      const api = AppInjector.get(ApiService);
      let result = yield api.auth.login(action.data).toPromise();
      yield put({ type: LOGIN_SUCCEEDED, data: result });
    } catch (e) {
      yield put({ type: API_CALL_ERROR, error: e });
    }
  });
}

function* watchLoginSuccessed() {
  yield takeLatest(LOGIN_SUCCEEDED, function*(action: any) {
    Cookies.set(environment.jwtTokenKey,action.data.accesstoken, { path: '/' });
    AppInjector.get(NotificationService).show('success', 'Login Success', 5000);
    const router = AppInjector.get(Router);
    if(isElectron()){
      window.localStorage.setItem(environment.jwtTokenKey,action.data.accesstoken)
      yield put({type : FETCH_LOGIN_DETAIL_REQUESTED})
      router.navigateByUrl('localhost:4200/dashboard');
    }else {
      router.navigate(['/dashboard']);
    }
  });
}

export const fetchLoginDetail = function*() {
  const fetched = yield select((state: any) => state.Auth.login.fetched);
  if (fetched) {
    return yield select((state: any) => state.Auth.login.profile);
  } else {
    try {
      return yield AppInjector.get(ApiService)
        .auth.profile()
        .toPromise();
    } catch (e) {
      yield put({ type: API_CALL_ERROR, error: e });
    }
  }
};

function* watchFetchProfileRequest() {
  yield takeLatest(FETCH_LOGIN_DETAIL_REQUESTED, function*(action: any) {
    const profile = yield call(fetchLoginDetail);
    yield put(fetchLoginDetailSuccessed(profile));
  });
}

export default [watchLoginRequest, watchLoginSuccessed, watchFetchProfileRequest];
