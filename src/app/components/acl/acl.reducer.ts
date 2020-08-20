import { combineReducers } from 'redux';
import { Roles } from './roles/roles.reducer';

export const Acl = combineReducers({
    Roles,
});
