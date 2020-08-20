export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED';
export const FETCH_LOGIN_DETAIL_REQUESTED = 'FETCH_LOGIN_DETAIL_REQUESTED';
export const FETCH_LOGIN_DETAIL_SUCCEEDED = 'FETCH_LOGIN_DETAIL_SUCCEEDED';

export const fetchLoginDetailRequested = () => {
  return {
    type: FETCH_LOGIN_DETAIL_REQUESTED
  };
};

export const fetchLoginDetailSuccessed = payload => {
  return {
    type: FETCH_LOGIN_DETAIL_SUCCEEDED,
    data: payload
  };
};
