/*
 *
 * DecideOnAvanceVoyageTable reducer
 *
 */
import produce from 'immer';
import {
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
  LOAD_AVANCE_VOYAGES,
  LOAD_AVANCE_VOYAGES_ERROR,
  LOAD_AVANCE_VOYAGES_SUCCESS,
  STATUS_AVANCE_VOYAGE,
} from './constants';

export const initialState = {
  loadingAvanceVoyages: false,
  errorLoadingAvanceVoyages: null,
  avanceVoyages: [],
  statusAvanceVoyage: '', // This state is used to show action notification in table page (Decision)
};

/* eslint-disable default-case, no-param-reassign */
const decideOnAvanceVoyageTableReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_AVANCE_VOYAGES:
        draft.loadingAvanceVoyages = true;
        draft.errorLoadingAvanceVoyages = false;
        break;
      case LOAD_AVANCE_VOYAGES_ERROR:
        draft.loadingAvanceVoyages = false;
        draft.errorLoadingAvanceVoyages = action.error;
        break;
      case LOAD_AVANCE_VOYAGES_SUCCESS:
        draft.loadingAvanceVoyages = false;
        draft.errorLoadingAvanceVoyages = false;
        draft.avanceVoyages = action.data;
        break;
      case STATUS_AVANCE_VOYAGE:
        draft.statusAvanceVoyage = action.data;
        break;
      case CLEANUP_STORE_ACTION:
        draft.loadingAvanceVoyages = false;
        draft.errorLoadingAvanceVoyages = null;
        draft.avanceVoyages = [];
        draft.statusAvanceVoyage = '';
        break;
    }
  });

export default decideOnAvanceVoyageTableReducer;
