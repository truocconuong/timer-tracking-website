import { edit } from './edit/edit.reducer';
import { combineReducers } from 'redux';
import { list } from './list/list.reducer';
import { create } from './create/create.reducer';
import { FETCH_ALL_ROLE_SUCCEEDED } from './roles.actions';
import * as _ from 'lodash';
import { DELETE_ROLE_SUCCEEDED } from './list/list.actions';
import { CREATE_ROLE_SUCCEEDED } from './create/create.actions';
import { FETCH_ROLE_DETAIL_SUCCEEDED } from './edit/edit.actions';

const all = (
  state = {
    fetched: false,
    items: []
  },
  action
) => {
  switch (action.type) {
    case FETCH_ROLE_DETAIL_SUCCEEDED:
    case CREATE_ROLE_SUCCEEDED:
    case DELETE_ROLE_SUCCEEDED:
      return _.assign({}, state, {
        fetched: false,
        items: []
      });

    case FETCH_ALL_ROLE_SUCCEEDED:
      return _.assign({}, state, {
        fetched: true,
        items: action.data
      });

    default:
      return state;
  }
};

export const Roles = combineReducers({
  all,
  list,
  edit,
  create
});
