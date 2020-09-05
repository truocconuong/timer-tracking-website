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
      return _.assign({}, state, {
        fetched: true,
        documents: action.documents,
        loading: false
      });

    default:
      return state;
  }
};
