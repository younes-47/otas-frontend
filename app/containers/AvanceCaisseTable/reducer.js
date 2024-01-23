/*
 *
 * AvanceCaisseTable reducer
 *
 */
import produce from 'immer';
import {
  STATUS_AVANCE_CAISSE,
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
  DELETE_AVANCE_CAISSE,
  DELETE_AVANCE_CAISSE_ERROR,
  DELETE_AVANCE_CAISSE_SUCCESS,
  LOAD_AVANCE_CAISSES,
  LOAD_AVANCE_CAISSES_ERROR,
  LOAD_AVANCE_CAISSES_SUCCESS,
  NULLIFY_ERROR_DELETING,
} from './constants';

export const initialState = {
  loadingAvanceCaisses: false,
  errorLoadingAvanceCaisses: null,
  avanceCaisses: [],
  deletingAvanceCaisse: false,
  errorDeletingAvanceCaisse: false,
  statusAvanceCaisse: '',
};

/* eslint-disable default-case, no-param-reassign */
const avanceCaisseTableReducer = (state = initialState, action) =>
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
      case NULLIFY_ERROR_DELETING:
        draft.errorDeletingAvanceCaisse = null;
        break;
      case DELETE_AVANCE_CAISSE:
        draft.deletingAvanceCaisse = true;
        draft.errorDeletingAvanceCaisse = false;
        break;
      case DELETE_AVANCE_CAISSE_ERROR:
        draft.deletingAvanceCaisse = false;
        draft.errorDeletingAvanceCaisse = action.error;
        break;
      case DELETE_AVANCE_CAISSE_SUCCESS:
        draft.deletingAvanceCaisse = false;
        draft.avanceCaisses = action.data;
        break;
      case CLEANUP_STORE_ACTION:
        draft.loadingAvanceCaisses = false;
        draft.errorLoadingAvanceCaisses = null;
        draft.avanceCaisses = [];
        draft.deletingAvanceCaisse = false;
        draft.errorDeletingAvanceCaisse = false;
        draft.statusAvanceCaisse = '';
        break;
    }
  });

export default avanceCaisseTableReducer;
