/*
 *
 * OrdreMissionForm reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  ADD_ORDRE_MISSION,
  UPDATE_ORDRE_MISSION,
  VIEW_ORDRE_MISSION,
  ON_BEHALF_SELECTION,
} from './constants';

export const initialState = {
  CHANGE_ABROAD_ACTION: false,
  onBehalfSelection: 'false',
};

/* eslint-disable default-case, no-param-reassign */
const ordreMissionFormReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case ADD_ORDRE_MISSION:
        draft.AddOrdreMission = true;
        draft.UpdateOrdreMission = false;
        draft.ViewOrdreMission = false;
        break;
      case UPDATE_ORDRE_MISSION:
        draft.AddOrdreMission = false;
        draft.UpdateOrdreMission = true;
        draft.ViewOrdreMission = false;
        break;
      case VIEW_ORDRE_MISSION:
        draft.AddOrdreMission = false;
        draft.UpdateOrdreMission = false;
        draft.ViewOrdreMission = true;
        break;
      case ON_BEHALF_SELECTION:
        draft.onBehalfSelection = action.selection;
        break;
    }
  });

export default ordreMissionFormReducer;
