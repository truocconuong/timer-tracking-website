export const API_CALL_ERROR = "API_CALL_ERROR";
export const FETCH_USER = "FETCH_USER";
export const fetchUser = payload => ({
  type: FETCH_USER,
  payload
});

export const FETCH_USER_SUCCEEDED = "FETCH_USER_SUCCEEDED";

export const fetchUserSUCCEEDED = payload => ({
  type: FETCH_USER_SUCCEEDED,
  payload
});
