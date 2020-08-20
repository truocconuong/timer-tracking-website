import { CREATE_ADMIN_USER_SUCCESSED, RENDER_CREATE_FORM_ADMIN_USER_REQUESTED, UPDATE_ADMIN_USER_INPUT_OPTION } from './create.actions';
import * as _ from 'lodash';

export const create = (state = { created: false, inputs: [] }, action) => {
  switch (action.type) {
    case CREATE_ADMIN_USER_SUCCESSED:
      return _.assign({}, state, { created: true, item: action.data });
    case RENDER_CREATE_FORM_ADMIN_USER_REQUESTED:
      return _.assign({}, state, { inputs: action.data.inputs });
    case UPDATE_ADMIN_USER_INPUT_OPTION:
      return _.assign({}, state, {
        inputs: _.map(state.inputs, input => {
          if (input.key === action.input) {
            input.options = action.data;
          }
          return input;
        })
      });
    default:
      return state;
  }
};
