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
  LOAD_STATIC_DATA,
  LOAD_STATIC_DATA_ERROR,
  LOAD_STATIC_DATA_SUCCESS,
  SUBMIT_DEPENSE_CAISSE,
  SUBMIT_DEPENSE_CAISSE_ERROR,
  SUBMIT_DEPENSE_CAISSE_SUCCESS,
  UPDATE_DEPENSE_CAISSE,
  UPDATE_DEPENSE_CAISSE_ERROR,
  UPDATE_DEPENSE_CAISSE_SUCCESS,
} from './constants';

export const initialState = {
  onBehalfSelection: 'false',
  addingDepenseCaisse: false,
  errorAddingDepenseCaisse: null,
  loadingStaticData: false,
  errorLoadingStaticData: null,
  staticData: null,
  updatingDepenseCaisse: false,
  errorUpdatingDepenseCaisse: null,
  submittingDepenseCaisse: false,
  errorSubmittingDepenseCaisse: null,
};

/* eslint-disable default-case, no-param-reassign */
const depenseCaisseFormReducer = (state = initialState, action) =>
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
      case SUBMIT_DEPENSE_CAISSE:
        draft.submittingDepenseCaisse = true;
        draft.errorSubmittingDepenseCaisse = null;
        break;
      case SUBMIT_DEPENSE_CAISSE_SUCCESS:
        draft.submittingDepenseCaisse = false;
        draft.errorSubmittingDepenseCaisse = false;
        break;
      case SUBMIT_DEPENSE_CAISSE_ERROR:
        draft.submittingDepenseCaisse = false;
        draft.errorSubmittingDepenseCaisse = true;
        break;
      case UPDATE_DEPENSE_CAISSE:
        draft.updatingDepenseCaisse = true;
        draft.errorUpdatingDepenseCaisse = null;
        break;
      case UPDATE_DEPENSE_CAISSE_SUCCESS:
        draft.updatingDepenseCaisse = false;
        draft.errorUpdatingDepenseCaisse = false;
        break;
      case UPDATE_DEPENSE_CAISSE_ERROR:
        draft.updatingDepenseCaisse = false;
        draft.errorUpdatingDepenseCaisse = true;
        break;
      case CHANGE_ONBEHALF_SELECTION_ACTION:
        draft.onBehalfSelection = action.selection;
        break;
      case CLEANUP_STORE_ACTION:
        draft.onBehalfSelection = 'false';
        draft.addingDepenseCaisse = false;
        draft.errorAddingDepenseCaisse = null;
        draft.loadingStaticData = false;
        draft.errorLoadingStaticData = null;
        draft.staticData = null;
        draft.updatingDepenseCaisse = false;
        draft.errorUpdatingDepenseCaisse = null;
        draft.submittingDepenseCaisse = false;
        draft.errorSubmittingDepenseCaisse = null;
        break;
    }
  });

export default depenseCaisseFormReducer;
