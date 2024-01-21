/*
 *
 * DepenseCaisse reducer
 *
 */
import produce from 'immer';
import {
  STATUS_DEPENSE_CAISSE,
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
  DELETE_DEPENSE_CAISSE,
  DELETE_DEPENSE_CAISSE_ERROR,
  DELETE_DEPENSE_CAISSE_SUCCESS,
  LOAD_DEPENSE_CAISSES,
  LOAD_DEPENSE_CAISSES_ERROR,
  LOAD_DEPENSE_CAISSES_SUCCESS,
} from './constants';

export const initialState = {
  loadingDepenseCaisses: false,
  errorLoadingDepenseCaisses: null,
  depenseCaisses: [],
  deletingDepenseCaisse: false,
  errorDeletingDepenseCaisse: null,
  downloadingDepenseCaisseReceiptsFile: false,
  errorDownloadingDepenseCaisseReceiptsFile: null,
  statusDepenseCaisse: '',
};
/* eslint-disable default-case, no-param-reassign */
const depenseCaisseReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_DEPENSE_CAISSES:
        draft.loadingDepenseCaisses = true;
        draft.errorLoadingDepenseCaisses = null;
        break;
      case LOAD_DEPENSE_CAISSES_ERROR:
        draft.loadingDepenseCaisses = false;
        draft.errorLoadingDepenseCaisses = true;
        break;
      case LOAD_DEPENSE_CAISSES_SUCCESS:
        draft.loadingDepenseCaisses = false;
        draft.errorLoadingDepenseCaisses = false;
        draft.depenseCaisses = action.data;
        break;
      case STATUS_DEPENSE_CAISSE:
        draft.statusDepenseCaisse = action.data;
        break;
      case DELETE_DEPENSE_CAISSE:
        draft.deletingDepenseCaisse = true;
        draft.errorDeletingDepenseCaisse = null;
        break;
      case DELETE_DEPENSE_CAISSE_ERROR:
        draft.deletingDepenseCaisse = false;
        draft.errorDeletingDepenseCaisse = action.error;
        break;
      case DELETE_DEPENSE_CAISSE_SUCCESS:
        draft.deletingDepenseCaisse = false;
        draft.errorDeletingDepenseCaisse = false;
        draft.depenseCaisses = action.data;
        break;
      case CLEANUP_STORE_ACTION:
        draft.loadingDepenseCaisses = false;
        draft.errorLoadingDepenseCaisses = null;
        draft.depenseCaisses = [];
        draft.deletingDepenseCaisse = false;
        draft.errorDeletingDepenseCaisse = null;
        draft.downloadingDepenseCaisseReceiptsFile = false;
        draft.errorDownloadingDepenseCaisseReceiptsFile = null;
        draft.statusDepenseCaisse = '';
        break;
    }
  });

export default depenseCaisseReducer;
