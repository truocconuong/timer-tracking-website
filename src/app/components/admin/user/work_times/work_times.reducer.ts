import * as _ from 'lodash';
import { FETCH_ALL_WORK_TIMES_SUCCESSED } from './work_times.actions';

export const work_times = (
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
    case FETCH_ALL_WORK_TIMES_SUCCESSED:
      return _.assign({}, state, {
        fetched: true,
        users: action.users,
        loading: false
      });

    default:
      return state;
  }
};
