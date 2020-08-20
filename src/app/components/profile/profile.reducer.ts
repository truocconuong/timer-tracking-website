import { Detail } from './detail/detail.reducer';
import { combineReducers } from 'redux';
import { ChangePassword } from './change-password/change-password.reducer';

export const Profile = combineReducers({
  Detail,
  ChangePassword
});
