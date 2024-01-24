/*
 *
 * OrdreMissionForm reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  ADD_ORDRE_MISSION,
  CHANGE_ONBEHALF_SELECTION_ACTION,
  CHANGE_ABROAD_ACTION,
  CHANGE_TRANSPORTATION_METHOD_ACTION,
  CLEANUP_STORE_ACTION,
  ADD_ORDRE_MISSION_ERROR,
  ADD_ORDRE_MISSION_SUCCESS,
  UPDATE_ORDRE_MISSION,
  UPDATE_ORDRE_MISSION_SUCCESS,
  UPDATE_ORDRE_MISSION_ERROR,
  SUBMIT_ORDRE_MISSION,
  SUBMIT_ORDRE_MISSION_SUCCESS,
  SUBMIT_ORDRE_MISSION_ERROR,
  LOAD_STATIC_DATA,
  LOAD_STATIC_DATA_SUCCESS,
  LOAD_STATIC_DATA_ERROR,
  LOAD_ORDRE_MISSION_DETAILS,
  LOAD_ORDRE_MISSION_DETAILS_SUCCESS,
  LOAD_ORDRE_MISSION_DETAILS_ERROR,
} from './constants';

export const initialState = {
  onBehalfSelection: 'false',
  abroadSelection: 'false',
  transportationMethodSelection: '',
  loadingStaticData: false,
  errorLoadingStaticData: null,
  staticData: null,
  addingOrdreMission: false,
  errorAddingOrdreMission: null,
  updatingOrdreMission: false,
  errorUpdatingOrdreMission: null,
  submittingOrdreMission: false,
  errorSubmittingOrdreMission: null,
  loadingOrdreMissionDetails: false,
  errorLoadingOrdreMissionDetails: null,
  ordreMissionDetails: null,
};

/* eslint-disable default-case, no-param-reassign */
const ordreMissionFormReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_STATIC_DATA:
        draft.loadingStaticData = true;
        draft.errorLoadingStaticData = null;
        break;
      case LOAD_STATIC_DATA_SUCCESS:
        draft.loadingStaticData = false;
        draft.errorLoadingStaticData = false;
        draft.staticData = action.data;
        break;
      case LOAD_STATIC_DATA_ERROR:
        draft.loadingStaticData = false;
        draft.errorLoadingStaticData = true;
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
      case ADD_ORDRE_MISSION:
        draft.addingOrdreMission = true;
        draft.errorAddingOrdreMission = null;
        break;
      case ADD_ORDRE_MISSION_SUCCESS:
        draft.addingOrdreMission = false;
        draft.errorAddingOrdreMission = false;
        break;
      case ADD_ORDRE_MISSION_ERROR:
        draft.addingOrdreMission = false;
        draft.errorAddingOrdreMission = true;
        break;
      case SUBMIT_ORDRE_MISSION:
        draft.submittingOrdreMission = true;
        draft.errorSubmittingOrdreMission = null;
        break;
      case SUBMIT_ORDRE_MISSION_SUCCESS:
        draft.submittingOrdreMission = false;
        draft.errorSubmittingOrdreMission = false;
        break;
      case SUBMIT_ORDRE_MISSION_ERROR:
        draft.submittingOrdreMission = false;
        draft.errorSubmittingOrdreMission = true;
        break;
      case UPDATE_ORDRE_MISSION:
        draft.updatingOrdreMission = true;
        draft.errorUpdatingOrdreMission = null;
        break;
      case UPDATE_ORDRE_MISSION_SUCCESS:
        draft.updatingOrdreMission = false;
        draft.errorUpdatingOrdreMission = false;
        break;
      case UPDATE_ORDRE_MISSION_ERROR:
        draft.updatingOrdreMission = false;
        draft.errorUpdatingOrdreMission = true;
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
      case CLEANUP_STORE_ACTION:
        draft.onBehalfSelection = 'false';
        draft.abroadSelection = 'false';
        draft.transportationMethodSelection = '';
        draft.addingOrdreMission = false;
        draft.errorAddingOrdreMission = null;
        draft.updatingOrdreMission = false;
        draft.errorUpdatingOrdreMission = null;
        draft.submittingOrdreMission = false;
        draft.errorSubmittingOrdreMission = null;
        draft.loadingOrdreMissionDetails = false;
        draft.errorLoadingOrdreMissionDetails = null;
        draft.ordreMissionDetails = null;
        break;
    }
  });

export default ordreMissionFormReducer;
