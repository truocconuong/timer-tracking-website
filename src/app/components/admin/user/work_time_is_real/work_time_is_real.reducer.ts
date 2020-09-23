import * as _ from 'lodash';
import { FETCH_DETAIL_WORK_TIMES_SUCCESSED } from './work_time_is_real.action';
import * as moment from 'moment';
export const work_time_is_real = (
  state = {
    fetched: false,
    loading: false,
    items: [],
    pagination: {},
    deleted: false
  },
  action
) => {
  switch (action.type) {
    default:
      return state;
  }
};
