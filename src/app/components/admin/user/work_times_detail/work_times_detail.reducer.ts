import * as _ from 'lodash';
import { FETCH_DETAIL_WORK_TIMES_SUCCESSED } from './work_times_detail.action';
import * as moment from 'moment';
export const work_times_detail = (
  state = {
    fetched: false,
    loading: false,
    items: [],
    pagination: {},
    deleted: false
  },
  action
) => {
  switch (action.type) {
    case FETCH_DETAIL_WORK_TIMES_SUCCESSED:
      const work_times_convert = [];
      const work_times = _.orderBy(action.user.work_times, ['id'], ['DESC']);
      console.log(work_times);
      _.map(work_times, (e) => (!_.isNil(e.urls) ? _.assign(e, { urls: JSON.parse(e.urls) }) : _.assign(e, { urls: [] })));
      for (const time of work_times) {
        const checkin = moment(time.checkin).format('DD/MM/YYYY');
        const checkIsExists = _.some(work_times_convert, { date: checkin });
        if (!checkIsExists) {
          const data = {
            date: checkin,
            work_times_on_day: []
          };
          work_times_convert.push(data);
        }
        const findDateNow = _.find(work_times_convert, (e) => (e.date === checkin ? e.work_times_on_day.push(time) : false));
        console.log('like this',work_times_convert)
      }
      return _.assign({}, state, {
        fetched: true,
        work_times: work_times_convert,
        loading: false
      });

    default:
      return state;
  }
};
