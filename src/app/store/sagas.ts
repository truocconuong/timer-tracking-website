import admin from '../components/admin/admin.saga';
import { PreloaderService } from './../common/services/preloader/preloader.service';
import { NotificationService } from '../common/services/notification/notification.service';
import { AppInjector } from './../app-injector';
import { takeEvery, fork } from 'redux-saga/effects';
import main from '../components/main.saga';
import auth from '../components/auth/auth.saga';
import { API_CALL_ERROR } from './action';
import acl from '../components/acl/acl.saga';
import profile from '../components/profile/profile.saga';

function* watchApiCallError() {
  yield takeEvery(API_CALL_ERROR, function*(action) {
    AppInjector.get(PreloaderService).hide();
    if ((action as any).error !== undefined) {
      if ((action as any).error.error !== undefined && (action as any).error.error.message !== undefined) {
        AppInjector.get(NotificationService).show('warning', (action as any).error.error.message, 5000);
      }
    }
  });
}

export default function* sagas() {
  yield [...admin, ...main, ...auth, ...acl, ...profile, watchApiCallError].map(item => fork(item));
}
