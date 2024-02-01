/*
 *
 * DecideOnAvanceCaisseTable reducer
 *
 */
import produce from 'immer';
import {
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
  LOAD_AVANCE_CAISSES,
  LOAD_AVANCE_CAISSES_ERROR,
  LOAD_AVANCE_CAISSES_SUCCESS,
  STATUS_AVANCE_CAISSE,
} from './constants';

export const initialState = {
  loadingAvanceCaisses: false,
  errorLoadingAvanceCaisses: null,
  avanceCaisses: [],
  statusAvanceCaisse: '', // This state is used to show action notification in table page (Decision)
};

/* eslint-disable default-case, no-param-reassign */
const decideOnAvanceCaisseTableReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_AVANCE_CAISSES:
        draft.loadingAvanceCaisses = true;
        draft.errorLoadingAvanceCaisses = false;
        break;
      case LOAD_AVANCE_CAISSES_ERROR:
        draft.loadingAvanceCaisses = false;
        draft.errorLoadingAvanceCaisses = action.error;
        break;
      case LOAD_AVANCE_CAISSES_SUCCESS:
        draft.loadingAvanceCaisses = false;
        draft.errorLoadingAvanceCaisses = false;
        draft.avanceCaisses = action.data;
        break;
      case STATUS_AVANCE_CAISSE:
        draft.statusAvanceCaisse = action.data;
        break;
      case CLEANUP_STORE_ACTION:
        draft.loadingAvanceCaisses = false;
        draft.errorLoadingAvanceCaisses = null;
        draft.avanceCaisses = [];
        draft.statusAvanceVoyage = '';
        break;
    }
  });

export default decideOnAvanceCaisseTableReducer;
