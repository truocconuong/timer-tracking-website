import { Admin } from '../components/admin/admin.reducer';
import * as _ from 'lodash';
import { combineReducers } from 'redux';
import { Auth } from '../components/auth/auth.reducer';
import { Acl } from '../components/acl/acl.reducer';
import { environment } from '../../environments/environment';
import { Profile } from '../components/profile/profile.reducer';
import { GET_ALL_WORKTIME_USER_SUCCESSED } from './action';
import * as moment from 'moment';

const RootReducer = (state = { config: environment, isShowBtnSettings: false }, action) => {
  switch (action.type) {
    case 'INIT_APP_MENU':
      const target = _.cloneDeep(action.data);
      const MenuItems = _.map(target, (item) => {
        item.main = _.map(item.main, (menu) => {
          if (_.isArray(menu.permissions) && menu.permissions.length > 0) {
            menu.show = action.user.hasOneOf(menu.permissions);
          } else {
            menu.show = true;
          }
          if (_.isArray(menu.states)) {
            menu.states = menu.states.map((i) => {
              if (i === 'CURRENT_USER_ID') {
                return action.user.id;
              }
              if (i === 'CURRENT_USER_EMAIL') {
                return action.user.email;
              }
              return i;
            });
          }
          return menu;
        });
        item.show = !_.isUndefined(_.find(item.main, (i) => i.show));
        return item;
      });
      return _.assign({}, state, { MenuItems: MenuItems, isShowBtnSettings: action.isShowBtnSettings });
    case GET_ALL_WORKTIME_USER_SUCCESSED:
      const work_times =[];
      const user_id = action.user_id;
      const filterDataUser = _.filter(action.data,e => e.user.id ===user_id);
      if(!_.isEmpty(filterDataUser)){
        const current = moment().format('DD/MM/YYYY');
        _.map(filterDataUser,e => _.assign(e,{checkin : moment(e.checkin),checkout : moment(e.checkout),date : moment(e.checkin).format('DD/MM/YYYY')}))
        _.filter(filterDataUser,data=>data.date === current ? work_times.push(data):false)
      }
      return _.assign({}, state, { work_times: work_times });
    default:
      return state;
  }
};

export default combineReducers({
  Admin,
  Auth,
  Acl,
  Profile,
  RootReducer
});
