/*
 *
 * OrdreMissionView reducer
 *
 */
import produce from 'immer';
import {
  CLEANUP_STORE,
  DEFAULT_ACTION,
  LOAD_ORDRE_MISSION_DETAILS,
  LOAD_ORDRE_MISSION_DETAILS_ERROR,
  LOAD_ORDRE_MISSION_DETAILS_SUCCESS,
} from './constants';

export const initialState = {
  loadingOrdreMissionDetails: false,
  errorLoadingOrdreMissionDetails: null,
  ordreMissionDetails: null,
};

/* eslint-disable default-case, no-param-reassign */
const ordreMissionViewReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
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
      case CLEANUP_STORE:
        draft.loadingOrdreMissionDetails = false;
        draft.errorLoadingOrdreMissionDetails = null;
        draft.ordreMissionDetails = null;
        break;
    }
  });

export default ordreMissionViewReducer;
