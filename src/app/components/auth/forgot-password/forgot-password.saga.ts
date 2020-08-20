import { API_CALL_ERROR } from './../../../store/action';
import { AppInjector } from './../../../app-injector';
import { FORGOT_PASSWORD_REQUESTED, FORGOT_PASSWORD_SUCCEEDED, FORGOT_PASSWORD_FAILEDED } from "./forgot-password.actions";
import { takeEvery, put } from "redux-saga/effects";
import * as _ from 'lodash';
import { ApiService } from '../../../api/api.service';
import { NotificationService } from '../../../common/services/notification/notification.service';

function* forgotPassword(action) {
  const api = AppInjector.get(ApiService);
  const notify = AppInjector.get(NotificationService);
  try {
    let result = yield api.auth.forgotPassword(action.data).toPromise();
    notify.show('success', "Password reset sent! We've just emailed you instructions on how to reset your password.", 5000);
    yield put({ type: FORGOT_PASSWORD_SUCCEEDED, data: result });
  } catch (e) {
    if (e.error.error_code === 1001 && e.error.message === 'User not found') {
      yield put({ type: FORGOT_PASSWORD_FAILEDED });
    }
    // yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchForgotPasswordRequest() {
  yield takeEvery(FORGOT_PASSWORD_REQUESTED, forgotPassword);
}

export default [
  watchForgotPasswordRequest,
];
