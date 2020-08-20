import { API_CALL_ERROR } from '../../../store/action';
import { put, takeLatest } from 'redux-saga/effects';
import { AppInjector } from '../../../app-injector';
import { ApiService } from '../../../api/api.service';
import * as _ from 'lodash';
import { NotificationService } from '../../../common/services/notification/notification.service';
import { PreloaderService } from '../../../common/services/preloader/preloader.service';
import { Router } from '@angular/router';
import { profileRouter } from '../profile.const';
import { CHANGE_PASSWORD_REQUESTED, CHANGE_PASSWORD_SUCCESSED } from './change-password.actions';

function* updatePassword(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  try {
    AppInjector.get(PreloaderService).show();
    let result = yield api.auth.changePassword(action.data).toPromise();
    yield put({ type: CHANGE_PASSWORD_SUCCESSED, data: result });
    AppInjector.get(NotificationService).show('success', `Update password successfully`, 3000);
    AppInjector.get(PreloaderService).hide();
    router.navigate(profileRouter());
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
    AppInjector.get(PreloaderService).hide();
  }
}

function* watchUpdatePassword() {
  yield takeLatest(CHANGE_PASSWORD_REQUESTED, updatePassword);
}

export default [watchUpdatePassword];
