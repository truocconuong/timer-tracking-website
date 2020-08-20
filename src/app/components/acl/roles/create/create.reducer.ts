import * as _ from 'lodash';
import { CREATE_ROLE_SUCCEEDED } from './create.actions';

export const create = (state = { created: false, item: {} }, action) => {
  switch (action.type) {
    case CREATE_ROLE_SUCCEEDED:
      return _.assign({}, state);

    default:
      return state;
  }
};
