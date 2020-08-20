import { Router } from '@angular/router';
import { API_CALL_ERROR } from './../../../store/action';
import { AppInjector } from './../../../app-injector';
import { RESET_PASSWORD_REQUESTED, RESET_PASSWORD_SUCCEEDED } from './reset-password.actions';
import { takeEvery, put } from 'redux-saga/effects';
import { ApiService } from '../../../api/api.service';
import { NotificationService } from '../../../common/services/notification/notification.service';
import { loginRouter } from '../../../app.const';

function* resetPassword(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  const notify = AppInjector.get(NotificationService);
  try {
    let result = yield api.auth.resetPassword(action.data).toPromise();
    yield put({ type: RESET_PASSWORD_SUCCEEDED });
    notify.show('success', 'Your password was reseted', 5000);
    router.navigate(loginRouter());
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchResetPasswordRequest() {
  yield takeEvery(RESET_PASSWORD_REQUESTED, resetPassword);
}

export default [watchResetPasswordRequest];
