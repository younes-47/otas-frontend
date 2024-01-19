/*
 *
 * DepenseCaisseForm reducer
 *
 */
import produce, { finishDraft } from 'immer';
import {
  ADD_DEPENSE_CAISSE,
  ADD_DEPENSE_CAISSE_ERROR,
  ADD_DEPENSE_CAISSE_SUCCESS,
  CHANGE_ONBEHALF_SELECTION_ACTION,
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
} from './constants';

export const initialState = {
  onBehalfSelection: 'false',
  addingDepenseCaisse: false,
  errorAddingDepenseCaisse: null,
};

/* eslint-disable default-case, no-param-reassign */
const depenseCaisseFormReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case ADD_DEPENSE_CAISSE:
        draft.addingDepenseCaisse = true;
        draft.errorAddingDepenseCaisse = null;
        break;
      case ADD_DEPENSE_CAISSE_SUCCESS:
        draft.addingDepenseCaisse = false;
        draft.errorAddingDepenseCaisse = false;
        break;
      case ADD_DEPENSE_CAISSE_ERROR:
        draft.addingDepenseCaisse = false;
        draft.errorAddingDepenseCaisse = true;
        break;
      case CHANGE_ONBEHALF_SELECTION_ACTION:
        draft.onBehalfSelection = action.selection;
        break;
      case CLEANUP_STORE_ACTION:
        draft.onBehalfSelection = 'false';
        draft.addingDepenseCaisse = false;
        draft.errorAddingDepenseCaisse = null;
        break;
    }
  });

export default depenseCaisseFormReducer;