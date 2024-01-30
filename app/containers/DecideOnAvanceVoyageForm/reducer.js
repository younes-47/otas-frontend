/*
 *
 * DecideOnAvanceVoyageForm reducer
 *
 */
import produce from 'immer';
import {
  CLEANUP_STORE_ACTION,
  DECIDE_ON_AVANCE_VOYAGE,
  DECIDE_ON_AVANCE_VOYAGE_ERROR,
  DECIDE_ON_AVANCE_VOYAGE_SUCCESS,
  DEFAULT_ACTION,
  LOAD_AVANCE_VOYAGE_DETAILS,
  LOAD_AVANCE_VOYAGE_DETAILS_ERROR,
  LOAD_AVANCE_VOYAGE_DETAILS_SUCCESS,
} from './constants';

export const initialState = {
  loadingAvanceVoyageDetails: false,
  errorLoadingAvanceVoyageDetails: null,
  avanceVoyageDetails: null,
  decidingOnAvanceVoyage: false,
  errorDecidingOnAvanceVoyage: null,
};

/* eslint-disable default-case, no-param-reassign */
const decideOnAvanceVoyageFormReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_AVANCE_VOYAGE_DETAILS:
        draft.loadingAvanceVoyageDetails = true;
        draft.errorLoadingAvanceVoyageDetails = null;
        break;
      case LOAD_AVANCE_VOYAGE_DETAILS_SUCCESS:
        draft.loadingAvanceVoyageDetails = false;
        draft.errorLoadingAvanceVoyageDetails = false;
        draft.avanceVoyageDetails = action.data;
        break;
      case LOAD_AVANCE_VOYAGE_DETAILS_ERROR:
        draft.loadingAvanceVoyageDetails = false;
        draft.errorLoadingAvanceVoyageDetails = true;
        break;
      case DECIDE_ON_AVANCE_VOYAGE:
        draft.decidingOnAvanceVoyage = true;
        draft.errorDecidingOnAvanceVoyage = null;
        break;
      case DECIDE_ON_AVANCE_VOYAGE_SUCCESS:
        draft.decidingOnAvanceVoyage = false;
        draft.errorDecidingOnAvanceVoyage = false;
        break;
      case DECIDE_ON_AVANCE_VOYAGE_ERROR:
        draft.decidingOnAvanceVoyage = false;
        draft.errorDecidingOnAvanceVoyage = true;
        break;
      case CLEANUP_STORE_ACTION:
        draft.loadingAvanceVoyageDetails = false;
        draft.errorLoadingAvanceVoyageDetails = null;
        draft.avanceVoyageDetails = null;
        draft.decidingOnAvanceVoyage = false;
        draft.errorDecidingOnAvanceVoyage = null;
        break;
    }
  });

export default decideOnAvanceVoyageFormReducer;
