import { combineReducers } from 'redux';
import { list } from './list/list.reducer';
import { create } from './create/create.reducer';
import { edit } from './edit/edit.reducer';
import * as _ from 'lodash';

export const User = combineReducers({
  list,
  create,
  edit
});
