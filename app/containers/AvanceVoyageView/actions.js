/*
 *
 * AvanceVoyageView actions
 *
 */

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

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadAvanceVoyageAction(id) {
  return {
    type: LOAD_AVANCE_VOYAGE,
    id,
  };
}

export function loadAvanceVoyageSuccessAction(data) {
  return {
    type: LOAD_AVANCE_VOYAGE_SUCCESS,
    data,
  };
}

export function loadAvanceVoyageErrorAction(error) {
  return {
    type: LOAD_AVANCE_VOYAGE_ERROR,
    error,
  };
}

export function cleanupAvanceVoyageViewStoreAction() {
  return {
    type: CLEANUP_STORE_ACTION,
  };
}

export function downloadAvanceVoyageDocumentFileAction(id) {
  return {
    type: DOWNLOAD_AVANCE_VOYAGE_DOCUMENT,
    id,
  };
}

export function downloadAvanceVoyageDocumentFileSuccessAction(data) {
  return {
    type: DOWNLOAD_AVANCE_VOYAGE_DOCUMENT_SUCCESS,
    data,
  };
}

export function downloadAvanceVoyageDocumentFileErrorAction(error) {
  return {
    type: DOWNLOAD_AVANCE_VOYAGE_DOCUMENT_ERROR,
    error,
  };
}
