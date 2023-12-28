/*
 *
 * Overview reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  LOAD_USER_INFO,
  LOAD_USER_INFO_ERROR,
  LOAD_USER_INFO_SUCCESS,
  STORE_CLEANUP,
} from './constants';

export const initialState = {
  loadingUserInfo: false,
  errorUserInfo: true,
  userInfo: {
    firstName: '',
    lastName: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const overviewReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_USER_INFO:
        draft.loadingUserInfo = true;
        draft.errorUserInfo = false;
        break;
      case LOAD_USER_INFO_SUCCESS:
        draft.loadingUserInfo = false;
        draft.errorUserInfo = false;
        draft.userInfo.firstName = action.data.firstName;
        draft.userInfo.lastName = action.data.lastName;
        break;
      case LOAD_USER_INFO_ERROR:
        draft.loadingUserInfo = false;
        draft.errorUserInfo = true;
        // draft.errorUserInfo = action.error;
        break;
      case STORE_CLEANUP:
        draft.loadingUserInfo = false;
        draft.errorUserInfo = true;
        draft.userInfo.firstName = '';
        draft.userInfo.lastName = '';
    }
  });

export default overviewReducer;
