/*
 *
 * DecideOnAvanceCaisseForm reducer
 *
 */
import produce from 'immer';
import {
  CLEANUP_STORE_ACTION,
  DECIDE_ON_AVANCE_CAISSE,
  DECIDE_ON_AVANCE_CAISSE_ERROR,
  DECIDE_ON_AVANCE_CAISSE_SUCCESS,
  DEFAULT_ACTION,
  LOAD_AVANCE_CAISSE_DETAILS,
  LOAD_AVANCE_CAISSE_DETAILS_ERROR,
  LOAD_AVANCE_CAISSE_DETAILS_SUCCESS,
} from './constants';

export const initialState = {
  loadingAvanceCaisseDetails: false,
  errorLoadingAvanceCaisseDetails: null,
  avanceCaisseDetails: null,
  decidingOnAvanceCaisse: false,
  errorDecidingOnAvanceCaisse: null,
};

/* eslint-disable default-case, no-param-reassign */
const decideOnAvanceCaisseFormReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_AVANCE_CAISSE_DETAILS:
        draft.loadingAvanceCaisseDetails = true;
        draft.errorLoadingAvanceCaisseDetails = null;
        break;
      case LOAD_AVANCE_CAISSE_DETAILS_SUCCESS:
        draft.loadingAvanceCaisseDetails = false;
        draft.errorLoadingAvanceCaisseDetails = false;
        draft.avanceCaisseDetails = action.data;
        break;
      case LOAD_AVANCE_CAISSE_DETAILS_ERROR:
        draft.loadingAvanceCaisseDetails = false;
        draft.errorLoadingAvanceCaisseDetails = true;
        break;
      case DECIDE_ON_AVANCE_CAISSE:
        draft.decidingOnAvanceCaisse = true;
        draft.errorDecidingOnAvanceCaisse = null;
        break;
      case DECIDE_ON_AVANCE_CAISSE_SUCCESS:
        draft.decidingOnAvanceCaisse = false;
        draft.errorDecidingOnAvanceCaisse = false;
        break;
      case DECIDE_ON_AVANCE_CAISSE_ERROR:
        draft.decidingOnAvanceCaisse = false;
        draft.errorDecidingOnAvanceCaisse = true;
        break;
      case CLEANUP_STORE_ACTION:
        draft.loadingAvanceCaisseDetails = false;
        draft.errorLoadingAvanceCaisseDetails = null;
        draft.avanceCaisseDetails = null;
        draft.decidingOnAvanceCaisse = false;
        draft.errorDecidingOnAvanceCaisse = null;
        break;
    }
  });

export default decideOnAvanceCaisseFormReducer;
