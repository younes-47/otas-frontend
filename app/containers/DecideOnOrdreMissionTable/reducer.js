/*
 *
 * DecideOnOrdreMissionTable reducer
 *
 */
import produce from 'immer';
import {
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
  LOAD_ORDRE_MISSIONS,
  LOAD_ORDRE_MISSIONS_ERROR,
  LOAD_ORDRE_MISSIONS_SUCCESS,
  STATUS_ORDRE_MISSION,
} from './constants';

export const initialState = {
  loadingOrdreMissions: false,
  errorLoadingOrdreMissions: null,
  ordreMissions: [],
  statusOrdreMission: '', // This state is used to show action notification in table page (Decision)
};

/* eslint-disable default-case, no-param-reassign */
const decideOnOrdreMissionTableReducer = (state = initialState, action) =>
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
      case STATUS_ORDRE_MISSION:
        draft.statusOrdreMission = action.data;
        break;
      case CLEANUP_STORE_ACTION:
        draft.loadingOrdreMissions = false;
        draft.errorLoadingOrdreMissions = null;
        draft.ordreMissions = [];
        draft.statusOrdreMission = '';
        break;
    }
  });

export default decideOnOrdreMissionTableReducer;
