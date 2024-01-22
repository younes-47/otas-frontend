/*
 *
 * OrdreMission reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  CHANGE_PAGE_CONTENT_ACTION,
  CLEANUP_STORE_ACTION,
  LOAD_ORDRE_MISSION_DETAILS,
  LOAD_ORDRE_MISSION_DETAILS_SUCCESS,
  LOAD_ORDRE_MISSION_DETAILS_ERROR,
} from './constants';

export const initialState = {
  pageContent: 'TABLE',
  loadingOrdreMissionDetails: false,
  errorLoadingOrdreMissionDetails: null,
  ordreMissionDetails: null,
};

/* eslint-disable default-case, no-param-reassign */
const ordreMissionReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_ORDRE_MISSION_DETAILS:
        draft.loadingOrdreMissionDetails = true;
        draft.errorLoadingOrdreMissionDetails = null;
        break;
      case LOAD_ORDRE_MISSION_DETAILS_SUCCESS:
        draft.loadingOrdreMissionDetails = false;
        draft.errorLoadingOrdreMissionDetails = false;
        draft.ordreMissionDetails = action.data;
        break;
      case LOAD_ORDRE_MISSION_DETAILS_ERROR:
        draft.loadingOrdreMissionDetails = false;
        draft.errorLoadingOrdreMissionDetails = true;
        break;
      case DEFAULT_ACTION:
        break;
      case CHANGE_PAGE_CONTENT_ACTION:
        draft.pageContent = action.pageContent;
        break;
      case CLEANUP_STORE_ACTION:
        draft.pageContent = 'TABLE';
        draft.loadingOrdreMissionDetails = false;
        draft.errorLoadingOrdreMissionDetails = null;
        draft.ordreMissionDetails = null;
        break;
    }
  });

export default ordreMissionReducer;
