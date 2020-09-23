import { API_CALL_ERROR, GET_ALL_WORKTIME_USER_REQUESTED } from '../../../../store/action';
import { PreloaderService } from '../../../../common/services/preloader/preloader.service';
import { AppInjector } from '../../../../app-injector';

import { takeEvery, put } from 'redux-saga/effects';
import { ApiService } from '../../../../api/api.service';
import * as _ from 'lodash';
import { FETCH_DETAIL_WORK_TIMES_REQUESTED, FETCH_DETAIL_WORK_TIMES_SUCCESSED } from './work_time_is_real.action';

function* watchFetchUserDetailWorkTimesRequested() {
  yield takeEvery(FETCH_DETAIL_WORK_TIMES_REQUESTED, function*(action: any) {
    try {
      AppInjector.get(PreloaderService).show();
      const results = yield AppInjector.get(ApiService)
        .admin.user.getAllUserDetail(action.id)
        .toPromise();
      AppInjector.get(PreloaderService).hide();
      yield put({ type: FETCH_DETAIL_WORK_TIMES_SUCCESSED, user: results});
    } catch (e) {
      AppInjector.get(PreloaderService).hide();
      yield put({ type: API_CALL_ERROR, error: e });
    }
  });
}

export default [watchFetchUserDetailWorkTimesRequested];
