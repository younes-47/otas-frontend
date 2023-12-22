/*
 *
 * OrdreMission reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  LOAD_ORDRE_MISSIONS,
  LOAD_ORDRE_MISSIONS_ERROR,
  LOAD_ORDRE_MISSIONS_SUCCESS,
  ADD_ORDRE_MISSION,
  UPDATE_ORDRE_MISSION,
  VIEW_ORDRE_MISSION,
  CHANGE_PAGE_CONTENT_ACTION,
  CHANGE_ONBEHALF_SELECTION_ACTION,
  CHANGE_ABROAD_ACTION,
  CHANGE_TRANSPORTATION_METHOD_ACTION,
  CLEANUP_STORE_ACTION,
} from './constants';

export const initialState = {
  loadingOrdreMissions: false,
  errorLoadingOrdreMissions: null,
  ordreMissions: [],
  onBehalfSelection: 'false',
  abroadSelection: 'false',
  transportationMethodSelection: '',
  addOrdreMissionData: null,
  errorAddingOrdreMission: null,
  pageContent: 'TABLE',
};

/* eslint-disable default-case, no-param-reassign */
const ordreMissionReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CHANGE_PAGE_CONTENT_ACTION:
        draft.pageContent = action.pageContent;
        break;
      case CLEANUP_STORE_ACTION:
        draft.loadingOrdreMissions = false;
        draft.errorLoadingOrdreMissions = null;
        draft.ordreMissions = [];
        draft.pageContent = 'TABLE';
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
      case ADD_ORDRE_MISSION:
        draft.addOrdreMissionData = action.data;
        draft.errorAddingOrdreMission = false;
        break;
      case CHANGE_ONBEHALF_SELECTION_ACTION:
        draft.onBehalfSelection = action.onBehalfSelection;
        break;
      case CHANGE_ABROAD_ACTION:
        draft.abroadSelection = action.abroadSelection;
        break;
      case CHANGE_TRANSPORTATION_METHOD_ACTION:
        draft.transportationMethodSelection =
          action.transportationMethodSelection;
        break;
    }
  });

export default ordreMissionReducer;
