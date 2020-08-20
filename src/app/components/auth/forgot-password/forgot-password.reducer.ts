import { FORGOT_PASSWORD_SUCCEEDED, FORGOT_PASSWORD_FAILEDED } from './forgot-password.actions';
import * as _ from 'lodash';

export const forgotPassword = (state = { isUser: true }, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_SUCCEEDED:
      return _.assign({}, state, { isSent: true });
    case FORGOT_PASSWORD_FAILEDED:
      return _.assign({}, state, { isUser: false });
    default:
      return state;
  }
};
