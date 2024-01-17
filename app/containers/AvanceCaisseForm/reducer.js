/*
 *
 * AvanceCaisseForm reducer
 *
 */
import produce from 'immer';
import {
  ADD_AVANCE_CAISSE,
  ADD_AVANCE_CAISSE_ERROR,
  ADD_AVANCE_CAISSE_SUCCESS,
  CHANGE_ONBEHALF_SELECTION_ACTION,
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
} from './constants';

export const initialState = {
  onBehalfSelection: 'false',
  addingAvanceCaisse: false,
  errorAddingAvanceCaisse: null,
};

/* eslint-disable default-case, no-param-reassign */
const avanceCaisseFormReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case ADD_AVANCE_CAISSE:
        draft.addingAvanceCaisse = true;
        draft.errorAddingAvanceCaisse = null;
        break;
      case ADD_AVANCE_CAISSE_SUCCESS:
        draft.addingAvanceCaisse = false;
        draft.errorAddingAvanceCaisse = false;
        break;
      case ADD_AVANCE_CAISSE_ERROR:
        draft.addingAvanceCaisse = false;
        draft.errorAddingAvanceCaisse = true;
        break;
      case CLEANUP_STORE_ACTION:
        draft.onBehalfSelection = 'false';
        draft.addingAvanceCaisse = false;
        draft.errorAddingAvanceCaisse = null;
        break;
      case CHANGE_ONBEHALF_SELECTION_ACTION:
        draft.onBehalfSelection = action.selection;
        break;
    }
  });

export default avanceCaisseFormReducer;
