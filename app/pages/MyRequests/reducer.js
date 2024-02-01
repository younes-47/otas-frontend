/*
 *
 * Overview reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  LOAD_REQUESTER_STATS,
  LOAD_REQUESTER_STATS_ERROR,
  LOAD_REQUESTER_STATS_SUCCESS,
  LOAD_USER_INFO,
  LOAD_USER_INFO_ERROR,
  LOAD_USER_INFO_SUCCESS,
  STORE_CLEANUP,
} from './constants';

export const initialState = {
  loadingUserInfo: false,
  errorUserInfo: null,
  userInfo: null,
  loadingRequesterStats: false,
  errorLoadingRequesterStats: null,
  requesterStats: null,
};

/* eslint-disable default-case, no-param-reassign */
const overviewReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_USER_INFO:
        draft.loadingUserInfo = true;
        draft.errorUserInfo = null;
        break;
      case LOAD_USER_INFO_SUCCESS:
        draft.loadingUserInfo = false;
        draft.errorUserInfo = false;
        draft.userInfo = action.data;
        break;
      case LOAD_USER_INFO_ERROR:
        draft.loadingUserInfo = false;
        draft.errorUserInfo = true;
        break;
      case LOAD_REQUESTER_STATS:
        draft.loadingRequesterStats = true;
        draft.errorLoadingRequesterStats = null;
        break;
      case LOAD_REQUESTER_STATS_SUCCESS:
        draft.loadingRequesterStats = false;
        draft.errorLoadingRequesterStats = false;
        draft.requesterStats = action.data;
        break;
      case LOAD_REQUESTER_STATS_ERROR:
        draft.loadingRequesterStats = false;
        draft.errorLoadingRequesterStats = true;
        break;
      case STORE_CLEANUP:
        draft.loadingUserInfo = false;
        draft.errorUserInfo = true;
        // draft.userInfo = null;
        draft.loadingRequesterStats = false;
        draft.errorLoadingRequesterStats = null;
        draft.requesterStats = null;
        break;
    }
  });

export default overviewReducer;
