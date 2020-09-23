import * as _ from 'lodash';
import { FETCH_ALL_WORK_TIMES_SUCCESSED } from './work_times.actions';
import * as moment from 'moment';
export const work_times = (
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
    case FETCH_ALL_WORK_TIMES_SUCCESSED:
      let work_times = [];
      for (const worktime of action.users) {
        let isSave = true;
        const daysNow = moment(worktime.checkin).format('DD/MM/YYYY');
        const works = _.filter(action.users, (time) => {
          return moment(time.checkin).format('DD/MM/YYYY') === daysNow;
        });
        for (const work of work_times) {
          if (work.date_is_format === daysNow) {
            console.log('chay zo day');
            isSave = false;
          }
        }
        if (isSave) {
          const hihi = {
            date: daysNow,
            work_times_on_day: works
          };
          const date_of_date = !_.isNil(localStorage.getItem('timer')) ? localStorage.getItem('timer') : '8:00';
          const work_first = works[0];
          const dateChuan = Number(date_of_date.replace(':', ''));
          let hours: any = moment(work_first.checkin).format('HH:mm');
          hours = Number(hours.replace(':', ''));
          const real_time = total(works);
          const data = {
            date_is_format: daysNow,
            id: work_first.id,
            data: hihi,
            email: work_first.user.email,
            checkin: work_first.checkin,
            checkout: _.last(works).checkout,
            real_times: real_time,
            status: dateChuan > hours ? 'Đúng giờ' : 'Muộn'
          };
          work_times.push(data);
        }
      }
      if (!_.isNil(action.search)) {
        const start = action.search.start;
        const end = action.search.end;
        work_times = _.filter(work_times, (time) => moment(start).format('DD/MM/YYYY') <= time.date_is_format && moment(end).format('DD/MM/YYYY') >= time.date_is_format);
      }

      if (!_.isNil(action.searchKey)) {
        work_times = _.filter(work_times, function (o) {
          return o.email.toLowerCase().indexOf(action.searchKey) > -1;
        });
      }
      return _.assign({}, state, {
        fetched: true,
        users: work_times,
        loading: false
      });

    default:
      return state;
  }
};

function diffSessionInSec(session) {
  return Math.floor(((new Date(session.checkout) as any) - (new Date(session.checkin) as any)) / 1000);
}

function total(sessions) {
  const diff = _.sumBy(sessions, (item) => diffSessionInSec(item));
  return stringToHHMMSS(diff);
}

function stringToHHMMSS(str: any) {
  const sec_num = parseInt(str, 10);
  let hours: any = Math.floor(sec_num / 3600);
  let minutes: any = Math.floor((sec_num - hours * 3600) / 60);
  let seconds: any = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return hours + ':' + minutes + ':' + seconds;
}
