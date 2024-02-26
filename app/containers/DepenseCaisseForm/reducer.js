/*
 *
 * DepenseCaisseForm reducer
 *
 */
import produce from 'immer';
import {
  ADD_DEPENSE_CAISSE,
  ADD_DEPENSE_CAISSE_ERROR,
  ADD_DEPENSE_CAISSE_SUCCESS,
  CHANGE_ONBEHALF_SELECTION_ACTION,
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
  DOWNLOAD_DEPENSE_CAISSE_DOCUMENT,
  DOWNLOAD_DEPENSE_CAISSE_DOCUMENT_ERROR,
  DOWNLOAD_DEPENSE_CAISSE_DOCUMENT_SUCCESS,
  LOAD_DEPENSE_CAISSE_DETAILS,
  LOAD_DEPENSE_CAISSE_DETAILS_ERROR,
  LOAD_DEPENSE_CAISSE_DETAILS_SUCCESS,
  LOAD_STATIC_DATA,
  LOAD_STATIC_DATA_ERROR,
  LOAD_STATIC_DATA_SUCCESS,
  SUBMIT_DEPENSE_CAISSE,
  SUBMIT_DEPENSE_CAISSE_ERROR,
  SUBMIT_DEPENSE_CAISSE_SUCCESS,
  UPDATE_DEPENSE_CAISSE,
  UPDATE_DEPENSE_CAISSE_ERROR,
  UPDATE_DEPENSE_CAISSE_SUCCESS,
} from './constants';

export const initialState = {
  onBehalfSelection: 'false',
  addingDepenseCaisse: false,
  errorAddingDepenseCaisse: null,
  loadingStaticData: false,
  errorLoadingStaticData: null,
  staticData: null,
  updatingDepenseCaisse: false,
  errorUpdatingDepenseCaisse: null,
  submittingDepenseCaisse: false,
  errorSubmittingDepenseCaisse: null,
  loadingDepenseCaisseDetails: false,
  errorLoadingDepenseCaisseDetails: null,
  depenseCaisseDetails: null,
  downloadingDepenseCaisseDocumentFile: false,
  errorDownloadingDepenseCaisseDocumentFile: null,
  depenseCaisseDocumentFile: null,
};

/* eslint-disable default-case, no-param-reassign */
const depenseCaisseFormReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case DOWNLOAD_DEPENSE_CAISSE_DOCUMENT:
        draft.downloadingDepenseCaisseDocumentFile = true;
        draft.errorDownloadingDepenseCaisseDocumentFile = null;
        break;
      case DOWNLOAD_DEPENSE_CAISSE_DOCUMENT_SUCCESS:
        draft.downloadingDepenseCaisseDocumentFile = false;
        draft.errorDownloadingDepenseCaisseDocumentFile = false;
        draft.depenseCaisseDocumentFile = action.data;
        break;
      case DOWNLOAD_DEPENSE_CAISSE_DOCUMENT_ERROR:
        draft.downloadingDepenseCaisseDocumentFile = false;
        draft.errorDownloadingDepenseCaisseDocumentFile = true;
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
      case LOAD_STATIC_DATA:
        draft.loadingStaticData = true;
        draft.errorLoadingStaticData = null;
        break;
      case LOAD_STATIC_DATA_SUCCESS:
        draft.loadingStaticData = false;
        draft.errorLoadingStaticData = false;
        draft.staticData = action.data;
        break;
      case LOAD_STATIC_DATA_ERROR:
        draft.loadingStaticData = false;
        draft.errorLoadingStaticData = true;
        break;
      case ADD_DEPENSE_CAISSE:
        draft.addingDepenseCaisse = true;
        draft.errorAddingDepenseCaisse = null;
        break;
      case ADD_DEPENSE_CAISSE_SUCCESS:
        draft.addingDepenseCaisse = false;
        draft.errorAddingDepenseCaisse = false;
        break;
      case ADD_DEPENSE_CAISSE_ERROR:
        draft.addingDepenseCaisse = false;
        draft.errorAddingDepenseCaisse = true;
        break;
      case SUBMIT_DEPENSE_CAISSE:
        draft.submittingDepenseCaisse = true;
        draft.errorSubmittingDepenseCaisse = null;
        break;
      case SUBMIT_DEPENSE_CAISSE_SUCCESS:
        draft.submittingDepenseCaisse = false;
        draft.errorSubmittingDepenseCaisse = false;
        break;
      case SUBMIT_DEPENSE_CAISSE_ERROR:
        draft.submittingDepenseCaisse = false;
        draft.errorSubmittingDepenseCaisse = true;
        break;
      case UPDATE_DEPENSE_CAISSE:
        draft.updatingDepenseCaisse = true;
        draft.errorUpdatingDepenseCaisse = null;
        break;
      case UPDATE_DEPENSE_CAISSE_SUCCESS:
        draft.updatingDepenseCaisse = false;
        draft.errorUpdatingDepenseCaisse = false;
        break;
      case UPDATE_DEPENSE_CAISSE_ERROR:
        draft.updatingDepenseCaisse = false;
        draft.errorUpdatingDepenseCaisse = true;
        break;
      case CHANGE_ONBEHALF_SELECTION_ACTION:
        draft.onBehalfSelection = action.selection;
        break;
      case CLEANUP_STORE_ACTION:
        draft.onBehalfSelection = 'false';
        draft.addingDepenseCaisse = false;
        draft.errorAddingDepenseCaisse = null;
        draft.loadingStaticData = false;
        draft.errorLoadingStaticData = null;
        draft.staticData = null;
        draft.updatingDepenseCaisse = false;
        draft.errorUpdatingDepenseCaisse = null;
        draft.submittingDepenseCaisse = false;
        draft.errorSubmittingDepenseCaisse = null;
        draft.loadingDepenseCaisseDetails = false;
        draft.errorLoadingDepenseCaisseDetails = null;
        draft.depenseCaisseDetails = null;
        draft.downloadingDepenseCaisseDocumentFile = false;
        draft.errorDownloadingDepenseCaisseDocumentFile = null;
        draft.depenseCaisseDocumentFile = null;
        break;
    }
  });

export default depenseCaisseFormReducer;
