/*
 *
 * DecideOnOrdreMissionForm reducer
 *
 */
import produce from 'immer';
import {
  CLEANUP_STORE_ACTION,
  DECIDE_ON_ORDRE_MISSION,
  DECIDE_ON_ORDRE_MISSION_ERROR,
  DECIDE_ON_ORDRE_MISSION_SUCCESS,
  DEFAULT_ACTION,
  LOAD_ORDRE_MISSION_DETAILS,
  LOAD_ORDRE_MISSION_DETAILS_ERROR,
  LOAD_ORDRE_MISSION_DETAILS_SUCCESS,
} from './constants';

export const initialState = {
  loadingOrdreMissionDetails: false,
  errorLoadingOrdreMissionDetails: null,
  ordreMissionDetails: null,
  decidingOnOrdreMission: false,
  errorDecidingOnOrdreMission: null,
};

/* eslint-disable default-case, no-param-reassign */
const decideOnOrdreMissionFormReducer = (state = initialState, action) =>
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
      case DECIDE_ON_ORDRE_MISSION:
        draft.decidingOnOrdreMission = true;
        draft.errorDecidingOnOrdreMission = null;
        break;
      case DECIDE_ON_ORDRE_MISSION_SUCCESS:
        draft.decidingOnOrdreMission = false;
        draft.errorDecidingOnOrdreMission = false;
        break;
      case DECIDE_ON_ORDRE_MISSION_ERROR:
        draft.decidingOnOrdreMission = false;
        draft.errorDecidingOnOrdreMission = true;
        break;
      case CLEANUP_STORE_ACTION:
        draft.loadingOrdreMissionDetails = false;
        draft.errorLoadingOrdreMissionDetails = null;
        draft.ordreMissionDetails = null;
        draft.decidingOnOrdreMission = false;
        draft.errorDecidingOnOrdreMission = null;
        break;
    }
  });

export default decideOnOrdreMissionFormReducer;
