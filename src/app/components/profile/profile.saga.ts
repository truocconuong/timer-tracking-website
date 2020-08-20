import * as _ from 'lodash';
import detail from './detail/detail.saga';
import changePass from './change-password/change-password.saga';
import { fork } from 'redux-saga/effects';

export default [...detail, ...changePass];
