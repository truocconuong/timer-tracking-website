import * as _ from 'lodash';
import list from './list/list.saga';
import work_times from './work_times/work_times.saga';
import work_times_detail from './work_times_detail/work_times_detail.saga';
import create from './create/create.saga';
import edit from './edit/edit.saga';

export default [...list, ...create, ...edit, ...work_times, ...work_times_detail];
