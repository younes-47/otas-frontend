/*
 *
 * DecideOnDepenseCaisseTable reducer
 *
 */
import produce from 'immer';
import {
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
  DOWNLOAD_DEPENSE_CAISSE_RECEIPTS,
  DOWNLOAD_DEPENSE_CAISSE_RECEIPTS_ERROR,
  DOWNLOAD_DEPENSE_CAISSE_RECEIPTS_SUCCESS,
  LOAD_DEPENSE_CAISSES,
  LOAD_DEPENSE_CAISSES_ERROR,
  LOAD_DEPENSE_CAISSES_SUCCESS,
  STATUS_DEPENSE_CAISSE,
} from './constants';

export const initialState = {
  loadingDepenseCaisses: false,
  errorLoadingDepenseCaisses: null,
  depenseCaisses: [],
  statusDepenseCaisse: '', // This state is used to show action notification in table page (Decision)
  downloadingDepenseCaisseReceiptsFile: false,
  errorDownloadingDepenseCaisseReceiptsFile: null,
  downloadDepenseCaisseReceiptsFileResponse: null,
};

/* eslint-disable default-case, no-param-reassign */
const decideOnDepenseCaisseTableReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_DEPENSE_CAISSES:
        draft.loadingDepenseCaisses = true;
        draft.errorLoadingDepenseCaisses = false;
        break;
      case LOAD_DEPENSE_CAISSES_ERROR:
        draft.loadingDepenseCaisses = false;
        draft.errorLoadingDepenseCaisses = action.error;
        break;
      case LOAD_DEPENSE_CAISSES_SUCCESS:
        draft.loadingDepenseCaisses = false;
        draft.errorLoadingDepenseCaisses = false;
        draft.depenseCaisses = action.data;
        break;
      case STATUS_DEPENSE_CAISSE:
        draft.statusDepenseCaisse = action.data;
        break;
      case DOWNLOAD_DEPENSE_CAISSE_RECEIPTS:
        draft.downloadingDepenseCaisseReceiptsFile = true;
        draft.errorDownloadingDepenseCaisseReceiptsFile = null;
        break;
      case DOWNLOAD_DEPENSE_CAISSE_RECEIPTS_SUCCESS:
        draft.downloadingDepenseCaisseReceiptsFile = false;
        draft.errorDownloadingDepenseCaisseReceiptsFile = false;
        draft.downloadDepenseCaisseReceiptsFileResponse = action.data;
        break;
      case DOWNLOAD_DEPENSE_CAISSE_RECEIPTS_ERROR:
        draft.downloadingDepenseCaisseReceiptsFile = false;
        draft.errorDownloadingDepenseCaisseReceiptsFile = true;
        break;
      case CLEANUP_STORE_ACTION:
        draft.loadingDepenseCaisses = false;
        draft.errorLoadingDepenseCaisses = null;
        draft.depenseCaisses = [];
        draft.statusDepenseCaisse = '';
        draft.downloadingDepenseCaisseReceiptsFile = false;
        draft.errorDownloadingDepenseCaisseReceiptsFile = null;
        draft.downloadDepenseCaisseReceiptsFileResponse = null;
        break;
    }
  });

export default decideOnDepenseCaisseTableReducer;
