import * as _ from 'lodash';
import { FETCH_ALL_USER_SUCCEEDED } from './list.actions';

export const list = (
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
    case FETCH_ALL_USER_SUCCEEDED:
      return _.assign({}, state, {
        fetched: true,
        users: action.users,
        loading: false
      });

    default:
      return state;
  }
};
