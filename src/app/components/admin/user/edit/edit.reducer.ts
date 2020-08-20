import { EDIT_ADMIN_USER_SUCCEEDED, GET_ADMIN_USER_DETAIL_SUCCESSED, RENDER_ADMIN_EDIT_USER_FORM_REQUESTED, FILL_ADMIN_USER_DETAIL_FORM } from './edit.actions';
import * as _ from 'lodash';

const Input = (state: any = {}, action) => {
  switch (action.type) {
    case FILL_ADMIN_USER_DETAIL_FORM:
      if (!_.isUndefined(_.get(action.data, state.key))) {
        state.value = _.get(action.data, state.key);
      }
      return state;
    default:
      return state;
  }
};

export const edit = (state = { updated: false, fetched: false, inputs: [], roles: [] }, action) => {
  switch (action.type) {
    case RENDER_ADMIN_EDIT_USER_FORM_REQUESTED:
      return _.assign({}, state, { inputs: action.data.inputs });
    case FILL_ADMIN_USER_DETAIL_FORM:
      return _.assign({}, state, { inputs: _.map(state.inputs, item => Input(item, action)) });
    case GET_ADMIN_USER_DETAIL_SUCCESSED:
      return _.assign({}, state, { fetched: true, item: action.data.user, roles: action.data.roles });
    case EDIT_ADMIN_USER_SUCCEEDED:
      return _.assign({}, state, { updated: true });
    default:
      return state;
  }
};
