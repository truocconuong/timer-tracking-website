import * as _ from 'lodash';
import list from './list/list.saga';
import create from './create/create.saga';
import edit from './edit/edit.saga';

export default [...list, ...create, ...edit];
