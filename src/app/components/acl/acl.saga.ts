import * as _ from 'lodash';
import roleSaga from './roles/roles.saga';
import { fork } from 'redux-saga/effects';

export default [...roleSaga];
