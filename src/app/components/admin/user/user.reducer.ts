import { combineReducers } from 'redux';
import { list } from './list/list.reducer';
import { create } from './create/create.reducer';
import { edit } from './edit/edit.reducer';
import { work_times } from './work_times/work_times.reducer';
import { work_times_detail } from './work_times_detail/work_times_detail.reducer';
import { work_time_is_real } from './work_time_is_real/work_time_is_real.reducer';
import { documents } from './documents/document.reducer';
import * as _ from 'lodash';

export const User = combineReducers({
  list,
  create,
  edit,
  work_times,
  work_times_detail,
  work_time_is_real,
  documents
});
