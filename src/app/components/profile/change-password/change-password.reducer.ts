import * as _ from 'lodash';
import { CHANGE_PASSWORD_SUCCESSED } from './change-password.actions';

export const ChangePassword = (state = { updated: false }, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_SUCCESSED:
      return Object.assign({}, state, { updated: true });
    default:
      return state;
  }
};
