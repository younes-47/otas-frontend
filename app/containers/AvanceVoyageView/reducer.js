/*
 *
 * AvanceVoyageView reducer
 *
 */
import produce from 'immer';
import {
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
  LOAD_AVANCE_VOYAGE,
  LOAD_AVANCE_VOYAGE_ERROR,
  LOAD_AVANCE_VOYAGE_SUCCESS,
} from './constants';

export const initialState = {
  loadingAvanceVoyage: false,
  errorLoadingAvanceVoyage: null,
  avanceVoyageDetails: null,
};

/* eslint-disable default-case, no-param-reassign */
const avanceVoyageViewReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_AVANCE_VOYAGE:
        draft.loadingAvanceVoyage = true;
        draft.errorLoadingAvanceVoyage = false;
        break;
      case LOAD_AVANCE_VOYAGE_ERROR:
        draft.loadingAvanceVoyage = false;
        draft.errorLoadingAvanceVoyage = action.error;
        break;
      case LOAD_AVANCE_VOYAGE_SUCCESS:
        draft.loadingAvanceVoyage = false;
        draft.errorLoadingAvanceVoyage = false;
        draft.avanceVoyageDetails = action.data;
        break;
      case CLEANUP_STORE_ACTION:
        draft.loadingAvanceVoyage = false;
        draft.errorLoadingAvanceVoyage = null;
        draft.avanceVoyageDetails = null;
        break;
    }
  });

export default avanceVoyageViewReducer;
