export const API_CALL_ERROR = "API_CALL_ERROR";
export const FETCH_USER = "FETCH_USER";
export const CHECK_IN = 'CHECK_IN';
export const CHECK_OUT = 'CHECK_OUT';
export const fetchUser = payload => ({
  type: FETCH_USER,
  payload
});

export const FETCH_USER_SUCCEEDED = "FETCH_USER_SUCCEEDED";

export const fetchUserSUCCEEDED = payload => ({
  type: FETCH_USER_SUCCEEDED,
  payload
});

export const GET_ALL_WORKTIME_USER_REQUESTED = 'GET_ALL_WORKTIME_USER_REQUESTED';
export const GET_ALL_WORKTIME_USER_SUCCESSED = 'GET_ALL_WORKTIME_USER_SUCCESSED';


export const SCREEN_DESKTOP = 'SCREEN_DESKTOP';