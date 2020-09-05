import { API_CALL_ERROR } from '../../../../store/action';
import { PreloaderService } from '../../../../common/services/preloader/preloader.service';
import { AppInjector } from '../../../../app-injector';
import { takeEvery, put } from 'redux-saga/effects';
import { ApiService } from '../../../../api/api.service';
import * as _ from 'lodash';
import { FETCH_ALL_DOCUMENTS_REQUESTED, FETCH_ALL_DOCUMENTS_SUCCESSED } from './document.actions';

function* watchFetchAllUserRequested() {
  yield takeEvery(FETCH_ALL_DOCUMENTS_REQUESTED, function* (action: any) {
    try {
      AppInjector.get(PreloaderService).show();
      const results = yield AppInjector.get(ApiService).documents.getAllDocument().toPromise();
      AppInjector.get(PreloaderService).hide();
      yield put({ type: FETCH_ALL_DOCUMENTS_SUCCESSED, documents: results });
    } catch (e) {
      AppInjector.get(PreloaderService).hide();
      yield put({ type: API_CALL_ERROR, error: e });
    }
  });
}

export default [watchFetchAllUserRequested];
