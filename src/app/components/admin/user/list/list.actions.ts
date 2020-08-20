export const FETCH_ALL_USER_REQUESTED = 'FETCH_ALL_USER_REQUESTED';
export const FETCH_ALL_USER_SUCCEEDED = 'FETCH_ALL_USER_SUCCEEDED';
export const UPDATE_ADMIN_USER_STATUS_REQUESTED = 'UPDATE_ADMIN_USER_STATUS_REQUESTED';
export const UPDATE_ADMIN_USER_STATUS_SUCCEEDED = 'UPDATE_ADMIN_USER_STATUS_SUCCEEDED';

export const updateUserStatusRequested = payload => Object.assign({}, { type: UPDATE_ADMIN_USER_STATUS_REQUESTED, data: payload });
export const updateUserStatusSuccessed = payload => Object.assign({}, { type: UPDATE_ADMIN_USER_STATUS_SUCCEEDED, data: payload });
