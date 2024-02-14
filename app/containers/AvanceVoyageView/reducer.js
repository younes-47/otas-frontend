/*
 *
 * AvanceVoyageView reducer
 *
 */
import produce from 'immer';
import {
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
  DOWNLOAD_AVANCE_VOYAGE_DOCUMENT,
  DOWNLOAD_AVANCE_VOYAGE_DOCUMENT_ERROR,
  DOWNLOAD_AVANCE_VOYAGE_DOCUMENT_SUCCESS,
  LOAD_AVANCE_VOYAGE,
  LOAD_AVANCE_VOYAGE_ERROR,
  LOAD_AVANCE_VOYAGE_SUCCESS,
} from './constants';

export const initialState = {
  loadingAvanceVoyage: false,
  errorLoadingAvanceVoyage: null,
  avanceVoyageDetails: null,
  downloadingAvanceVoyageDocumentFile: false,
  errorDownloadingAvanceVoyageDocumentFile: null,
  avanceVoyageDocumentFile: null,
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
      case DOWNLOAD_AVANCE_VOYAGE_DOCUMENT:
        draft.downloadingAvanceVoyageDocumentFile = true;
        draft.errorDownloadingAvanceVoyageDocumentFile = null;
        break;
      case DOWNLOAD_AVANCE_VOYAGE_DOCUMENT_SUCCESS:
        draft.downloadingAvanceVoyageDocumentFile = false;
        draft.errorDownloadingAvanceVoyageDocumentFile = false;
        draft.avanceVoyageDocumentFile = action.data;
        break;
      case DOWNLOAD_AVANCE_VOYAGE_DOCUMENT_ERROR:
        draft.downloadingAvanceVoyageDocumentFile = false;
        draft.errorDownloadingAvanceVoyageDocumentFile = true;
        break;
      case CLEANUP_STORE_ACTION:
        draft.loadingAvanceVoyage = false;
        draft.errorLoadingAvanceVoyage = null;
        draft.avanceVoyageDetails = null;
        draft.downloadingAvanceVoyageDocumentFile = false;
        draft.errorDownloadingAvanceVoyageDocumentFile = null;
        draft.avanceVoyageDocumentFile = null;
        break;
    }
  });

export default avanceVoyageViewReducer;
