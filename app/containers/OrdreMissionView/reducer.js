/*
 *
 * OrdreMissionView reducer
 *
 */
import produce from 'immer';
import {
  CLEANUP_STORE,
  DEFAULT_ACTION,
  SUBMIT_ORDRE_MISSION,
  SUBMIT_ORDRE_MISSION_ERROR,
  SUBMIT_ORDRE_MISSION_SUCCESS,
} from './constants';

export const initialState = {
  submittingOrdreMission: false,
  errorSubmittingOrdreMission: null,
};

/* eslint-disable default-case, no-param-reassign */
const ordreMissionViewReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case SUBMIT_ORDRE_MISSION:
        draft.submittingOrdreMission = true;
        draft.errorSubmittingOrdreMission = null;
        break;
      case SUBMIT_ORDRE_MISSION_SUCCESS:
        draft.submittingOrdreMission = false;
        draft.errorLoadingOrdreMissionDetails = false;
        break;
      case SUBMIT_ORDRE_MISSION_ERROR:
        draft.submittingOrdreMission = false;
        draft.errorSubmittingOrdreMission = true;
        break;
      case CLEANUP_STORE:
        draft.loadingOrdreMissionDetails = false;
        draft.errorLoadingOrdreMissionDetails = null;
        draft.ordreMissionDetails = null;
        draft.submittingOrdreMission = false;
        draft.errorSubmittingOrdreMission = null;
        break;
    }
  });

export default ordreMissionViewReducer;
