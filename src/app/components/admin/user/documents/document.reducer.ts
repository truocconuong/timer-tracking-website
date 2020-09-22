import * as _ from 'lodash';
import { FETCH_ALL_DOCUMENTS_SUCCESSED } from './document.actions';

export const documents = (
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
    case FETCH_ALL_DOCUMENTS_SUCCESSED:
      console.log(action.documents)
      if (!_.isNil(action.search)) {
        action.documents = _.filter(action.documents, function (o) {
          return o.user.email.toLowerCase().indexOf(action.search) > -1;
        });
      }
      return _.assign({}, state, {
        fetched: true,
        documents: action.documents,
        loading: false
      });

    default:
      return state;
  }
};
