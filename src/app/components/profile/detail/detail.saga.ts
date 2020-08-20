import { API_CALL_ERROR } from '../../../store/action';
import { put, takeLatest } from 'redux-saga/effects';
import {
  RENDER_PROFILE_DETAIL_FORM,
  FETCH_PROFILE_DETAIL_REQUESTED,
  FETCH_PROFILE_DETAIL_SUCCESSED,
  UPDATE_AVATAR_PROFILE,
  UPDATE_PROFILE_REQUESTED,
  UPDATE_PROFILE_SUCCESSED
} from './detail.action';
import { AppInjector } from '../../../app-injector';
import { ApiService } from '../../../api/api.service';
import * as _ from 'lodash';
import { NotificationService } from '../../../common/services/notification/notification.service';
import { PreloaderService } from '../../../common/services/preloader/preloader.service';
import { Router } from '@angular/router';
import { profileRouter } from '../profile.const';

function* watchProfileDetailFormRendered() {
  yield takeLatest(RENDER_PROFILE_DETAIL_FORM, function*(action) {
    yield put({ type: FETCH_PROFILE_DETAIL_REQUESTED });
  });
}

function* fetchProfileDetail(action) {
  const api = AppInjector.get(ApiService);
  try {
    let result = yield api.admin.user.profile().toPromise();
    yield put({ type: FETCH_PROFILE_DETAIL_SUCCESSED, data: result });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchFetchProfileDetailRequested() {
  yield takeLatest(FETCH_PROFILE_DETAIL_REQUESTED, fetchProfileDetail);
}

function* updateAvatarProfile(action) {
  const api = AppInjector.get(ApiService);
  try {
    AppInjector.get(PreloaderService).show();
    let result = yield api.auth.updateAvatar(action.data).toPromise();
    AppInjector.get(NotificationService).show('success', `Update avatar successfully`, 3000);
    AppInjector.get(PreloaderService).hide();
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
    AppInjector.get(PreloaderService).hide();
  }
}

function* watchUpdateAvatarProfile() {
  yield takeLatest(UPDATE_AVATAR_PROFILE, updateAvatarProfile);
}

function* updateProfile(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  try {
    AppInjector.get(PreloaderService).show();
    let result = yield api.auth.updateProfile(action.data).toPromise();
    yield put({ type: UPDATE_PROFILE_SUCCESSED, data: result });
    AppInjector.get(NotificationService).show('success', `Update profile successfully`, 3000);
    AppInjector.get(PreloaderService).hide();
    router.navigate(profileRouter());
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
    AppInjector.get(PreloaderService).hide();
  }
}

function* watchUpdateProfile() {
  yield takeLatest(UPDATE_PROFILE_REQUESTED, updateProfile);
}

export default [watchProfileDetailFormRendered, watchFetchProfileDetailRequested, watchUpdateAvatarProfile, watchUpdateProfile];
