import * as _ from 'lodash';
import { FETCH_PROFILE_DETAIL_SUCCESSED, UPDATE_PROFILE_SUCCESSED } from './detail.action';
import { InputBase, TextBox, DateTimePicker, PhoneCode } from '@vicoders/reactive-form';

const getLabel = key => {
  let label = key.replace('_', ' ');
  label = label.charAt(0).toUpperCase() + label.slice(1);
  return label;
};

export const Detail = (state = { updated: false, inputs: [] }, action) => {
  switch (action.type) {
    case FETCH_PROFILE_DETAIL_SUCCESSED:
      let adminFieldable = [{ key: 'email', type: 'TextBox' }];
      let inputs: InputBase<any>[] = [];
      _.forEach(action.data, function(value, key) {
        _.forEach(adminFieldable, function(rfa) {
          if (key === rfa.key && rfa.type === 'TextBox') {
            inputs.push(
              new TextBox({
                key: key,
                label: getLabel(key),
                classes: ['col-12'],
                group_classes: ['col-12'],
                order: 1,
                value: value
              })
            );
          }
        });
      });
      return Object.assign({}, state, { inputs: inputs });
    case UPDATE_PROFILE_SUCCESSED:
      return Object.assign({}, state, { updated: true });
    default:
      return state;
  }
};
