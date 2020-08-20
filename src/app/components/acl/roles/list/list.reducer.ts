import { FETCH_ALL_ROLE_SUCCEEDED } from './list.actions';
import * as _ from 'lodash';

export const list = (state = { fetched: false, items: [] }, action) => {
  switch (action.type) {
    case FETCH_ALL_ROLE_SUCCEEDED:
      return _.assign({}, state, {
        fetched: true,
        items: action.data
      });

    default:
      return state;
  }
};
