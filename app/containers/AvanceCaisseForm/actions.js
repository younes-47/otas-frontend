/*
 *
 * AvanceCaisseForm actions
 *
 */

import {
  ADD_AVANCE_CAISSE,
  ADD_AVANCE_CAISSE_ERROR,
  ADD_AVANCE_CAISSE_SUCCESS,
  CHANGE_ONBEHALF_SELECTION_ACTION,
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
  DOWNLOAD_AVANCE_CAISSE_DOCUMENT,
  DOWNLOAD_AVANCE_CAISSE_DOCUMENT_ERROR,
  DOWNLOAD_AVANCE_CAISSE_DOCUMENT_SUCCESS,
  LOAD_AVANCE_CAISSE_DETAILS,
  LOAD_AVANCE_CAISSE_DETAILS_ERROR,
  LOAD_AVANCE_CAISSE_DETAILS_SUCCESS,
  LOAD_STATIC_DATA,
  LOAD_STATIC_DATA_ERROR,
  LOAD_STATIC_DATA_SUCCESS,
  SUBMIT_AVANCE_CAISSE,
  SUBMIT_AVANCE_CAISSE_ERROR,
  SUBMIT_AVANCE_CAISSE_SUCCESS,
  UPDATE_AVANCE_CAISSE,
  UPDATE_AVANCE_CAISSE_ERROR,
  UPDATE_AVANCE_CAISSE_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadAvanceCaisseDetailsAction(id) {
  return {
    type: LOAD_AVANCE_CAISSE_DETAILS,
    id,
  };
}
export function loadAvanceCaisseDetailsSuccessAction(data) {
  return {
    type: LOAD_AVANCE_CAISSE_DETAILS_SUCCESS,
    data,
  };
}

export function loadAvanceCaisseDetailsErrorAction(error) {
  return {
    type: LOAD_AVANCE_CAISSE_DETAILS_ERROR,
    error,
  };
}

export function LoadStaticDataAction() {
  return {
    type: LOAD_STATIC_DATA,
  };
}

export function LoadStaticDataSuccessAction(data) {
  return {
    type: LOAD_STATIC_DATA_SUCCESS,
    data,
  };
}

export function LoadStaticDataErrorAction(error) {
  return {
    type: LOAD_STATIC_DATA_ERROR,
    error,
  };
}

export function AddAvanceCaisseAction(form) {
  return {
    type: ADD_AVANCE_CAISSE,
    form,
  };
}

export function AddAvanceCaisseErrorAction(error) {
  return {
    type: ADD_AVANCE_CAISSE_ERROR,
    error,
  };
}
export function AddAvanceCaisseSuccessAction() {
  return {
    type: ADD_AVANCE_CAISSE_SUCCESS,
  };
}

export function UpdateAvanceCaisseAction(form) {
  return {
    type: UPDATE_AVANCE_CAISSE,
    form,
  };
}

export function UpdateAvanceCaisseSuccessAction() {
  return {
    type: UPDATE_AVANCE_CAISSE_SUCCESS,
  };
}

export function UpdateAvanceCaisseErrorAction(error) {
  return {
    type: UPDATE_AVANCE_CAISSE_ERROR,
    error,
  };
}

export function submitAvanceCaisseAction(id) {
  return {
    type: SUBMIT_AVANCE_CAISSE,
    id,
  };
}
export function submitAvanceCaisseSuccessAction(data) {
  return {
    type: SUBMIT_AVANCE_CAISSE_SUCCESS,
    data,
  };
}

export function submitAvanceCaisseErrorAction(error) {
  return {
    type: SUBMIT_AVANCE_CAISSE_ERROR,
    error,
  };
}
export function downloadAvanceCaisseDocumentFileAction() {
  return {
    type: DOWNLOAD_AVANCE_CAISSE_DOCUMENT,
  };
}

export function downloadAvanceCaisseDocumentFileSuccessAction(data) {
  return {
    type: DOWNLOAD_AVANCE_CAISSE_DOCUMENT_SUCCESS,
    data,
  };
}

export function downloadAvanceCaisseDocumentFileErrorAction(error) {
  return {
    type: DOWNLOAD_AVANCE_CAISSE_DOCUMENT_ERROR,
    error,
  };
}

export function SelectOnBehalfAction(selection) {
  return {
    type: CHANGE_ONBEHALF_SELECTION_ACTION,
    selection,
  };
}

export function cleanupAvanceCaisseFormPageStoreAction() {
  return {
    type: CLEANUP_STORE_ACTION,
  };
}
