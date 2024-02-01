/*
 *
 * DecideOnDepenseCaisseForm reducer
 *
 */
import produce from 'immer';
import {
  CLEANUP_STORE_ACTION,
  DECIDE_ON_DEPENSE_CAISSE,
  DECIDE_ON_DEPENSE_CAISSE_ERROR,
  DECIDE_ON_DEPENSE_CAISSE_SUCCESS,
  DEFAULT_ACTION,
  LOAD_DEPENSE_CAISSE_DETAILS,
  LOAD_DEPENSE_CAISSE_DETAILS_ERROR,
  LOAD_DEPENSE_CAISSE_DETAILS_SUCCESS,
} from './constants';

export const initialState = {
  loadingDepenseCaisseDetails: false,
  errorLoadingDepenseCaisseDetails: null,
  depenseCaisseDetails: null,
  decidingOnDepenseCaisse: false,
  errorDecidingOnDepenseCaisse: null,
};

/* eslint-disable default-case, no-param-reassign */
const decideOnDepenseCaisseFormReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_DEPENSE_CAISSE_DETAILS:
        draft.loadingDepenseCaisseDetails = true;
        draft.errorLoadingDepenseCaisseDetails = null;
        break;
      case LOAD_DEPENSE_CAISSE_DETAILS_SUCCESS:
        draft.loadingDepenseCaisseDetails = false;
        draft.errorLoadingDepenseCaisseDetails = false;
        draft.depenseCaisseDetails = action.data;
        break;
      case LOAD_DEPENSE_CAISSE_DETAILS_ERROR:
        draft.loadingDepenseCaisseDetails = false;
        draft.errorLoadingDepenseCaisseDetails = true;
        break;
      case DECIDE_ON_DEPENSE_CAISSE:
        draft.decidingOnDepenseCaisse = true;
        draft.errorDecidingOnDepenseCaisse = null;
        break;
      case DECIDE_ON_DEPENSE_CAISSE_SUCCESS:
        draft.decidingOnDepenseCaisse = false;
        draft.errorDecidingOnDepenseCaisse = false;
        break;
      case DECIDE_ON_DEPENSE_CAISSE_ERROR:
        draft.decidingOnDepenseCaisse = false;
        draft.errorDecidingOnDepenseCaisse = true;
        break;
      case CLEANUP_STORE_ACTION:
        draft.loadingDepenseCaisseDetails = false;
        draft.errorLoadingDepenseCaisseDetails = null;
        draft.depenseCaisseDetails = null;
        draft.decidingOnDepenseCaisse = false;
        draft.errorDecidingOnDepenseCaisse = null;
        break;
    }
  });

export default decideOnDepenseCaisseFormReducer;
