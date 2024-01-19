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
} from './constants';

export const initialState = {
  onBehalfSelection: 'false',
  abroadSelection: 'false',
  transportationMethodSelection: '',
  addingOrdreMission: false,
  errorAddingOrdreMission: null,
  ordreMissionIdentity: null,
};

/* eslint-disable default-case, no-param-reassign */
const ordreMissionFormReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case ADD_ORDRE_MISSION:
        draft.addingOrdreMission = true;
        draft.errorAddingOrdreMission = null;
        break;
      case ADD_ORDRE_MISSION_SUCCESS:
        draft.addingOrdreMission = false;
        draft.errorAddingOrdreMission = false;
        draft.ordreMissionIdentity = action.id;
        break;
      case ADD_ORDRE_MISSION_ERROR:
        draft.addingOrdreMission = false;
        draft.errorAddingOrdreMission = true;
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
        draft.ordreMissionIdentity = null;
        break;
    }
  });

export default ordreMissionFormReducer;
