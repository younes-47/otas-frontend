/*
 *
 * AvanceCaisseTable reducer
 *
 */
import produce from 'immer';
import {
  ADDED_AVANCE_CAISSE,
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
  DELETE_AVANCE_CAISSE,
  DELETE_AVANCE_CAISSE_ERROR,
  DELETE_AVANCE_CAISSE_SUCCESS,
  LOAD_AVANCE_CAISSES,
  LOAD_AVANCE_CAISSES_ERROR,
  LOAD_AVANCE_CAISSES_SUCCESS,
} from './constants';

export const initialState = {
  loadingAvanceCaisses: false,
  errorLoadingAvanceCaisses: null,
  avanceCaisses: [],
  deletingAvanceCaisse: false,
  errorDeletingAvanceCaisse: false,
  addedAvanceCaisse: false,
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
      case ADDED_AVANCE_CAISSE:
        draft.addedAvanceCaisse = true;
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
        draft.addedAvanceCaisse = false;
        break;
    }
  });

export default avanceCaisseTableReducer;
