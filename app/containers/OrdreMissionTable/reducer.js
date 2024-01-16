/*
 *
 * OrdreMissionTable reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  DELETE_ORDRE_MISSION,
  DELETE_ORDRE_MISSION_ERROR,
  DELETE_ORDRE_MISSION_SUCCESS,
  LOAD_ORDRE_MISSIONS,
  LOAD_ORDRE_MISSIONS_ERROR,
  LOAD_ORDRE_MISSIONS_SUCCESS,
} from './constants';

export const initialState = {
  loadingOrdreMissions: false,
  errorLoadingOrdreMissions: null,
  ordreMissions: [],
  deletingOrdreMission: false,
  errorDeletingOrdreMission: false,
};

/* eslint-disable default-case, no-param-reassign */
const ordreMissionTableReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_ORDRE_MISSIONS:
        draft.loadingOrdreMissions = true;
        draft.errorLoadingOrdreMissions = false;
        break;
      case LOAD_ORDRE_MISSIONS_ERROR:
        draft.loadingOrdreMissions = false;
        draft.errorLoadingOrdreMissions = action.error;
        break;
      case LOAD_ORDRE_MISSIONS_SUCCESS:
        draft.loadingOrdreMissions = false;
        draft.errorLoadingOrdreMissions = false;
        draft.ordreMissions = action.data;
        break;
      case DELETE_ORDRE_MISSION:
        draft.deletingOrdreMission = true;
        draft.errorDeletingOrdreMission = false;
        break;
      case DELETE_ORDRE_MISSION_ERROR:
        draft.deletingOrdreMission = false;
        draft.errorDeletingOrdreMission = action.error;
        break;
      case DELETE_ORDRE_MISSION_SUCCESS:
        draft.deletingOrdreMission = false;
        draft.ordreMissions = action.data;
        break;
    }
  });

export default ordreMissionTableReducer;
