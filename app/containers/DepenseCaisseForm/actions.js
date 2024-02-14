/*
 *
 * DepenseCaisseForm actions
 *
 */

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

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadDepenseCaisseDetailsAction(id) {
  return {
    type: LOAD_DEPENSE_CAISSE_DETAILS,
    id,
  };
}
export function loadDepenseCaisseDetailsSuccessAction(data) {
  return {
    type: LOAD_DEPENSE_CAISSE_DETAILS_SUCCESS,
    data,
  };
}

export function loadDepenseCaisseDetailsErrorAction(error) {
  return {
    type: LOAD_DEPENSE_CAISSE_DETAILS_ERROR,
    error,
  };
}

export function SelectOnBehalfAction(selection) {
  return {
    type: CHANGE_ONBEHALF_SELECTION_ACTION,
    selection,
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

export function AddDepenseCaisseAction(form) {
  return {
    type: ADD_DEPENSE_CAISSE,
    form,
  };
}

export function AddDepenseCaisseErrorAction(error) {
  return {
    type: ADD_DEPENSE_CAISSE_ERROR,
    error,
  };
}
export function AddDepenseCaisseSuccessAction() {
  return {
    type: ADD_DEPENSE_CAISSE_SUCCESS,
  };
}

export function UpdateDepenseCaisseAction(form) {
  return {
    type: UPDATE_DEPENSE_CAISSE,
    form,
  };
}

export function UpdateDepenseCaisseSuccessAction() {
  return {
    type: UPDATE_DEPENSE_CAISSE_SUCCESS,
  };
}

export function UpdateDepenseCaisseErrorAction(error) {
  return {
    type: UPDATE_DEPENSE_CAISSE_ERROR,
    error,
  };
}

export function submitDepenseCaisseAction(id) {
  return {
    type: SUBMIT_DEPENSE_CAISSE,
    id,
  };
}
export function submitDepenseCaisseSuccessAction(data) {
  return {
    type: SUBMIT_DEPENSE_CAISSE_SUCCESS,
    data,
  };
}

export function submitDepenseCaisseErrorAction(error) {
  return {
    type: SUBMIT_DEPENSE_CAISSE_ERROR,
    error,
  };
}

export function downloadDepenseCaisseDocumentFileAction(id) {
  return {
    type: DOWNLOAD_DEPENSE_CAISSE_DOCUMENT,
    id,
  };
}

export function downloadDepenseCaisseDocumentFileSuccessAction(data) {
  return {
    type: DOWNLOAD_DEPENSE_CAISSE_DOCUMENT_SUCCESS,
    data,
  };
}

export function downloadDepenseCaisseDocumentFileErrorAction(error) {
  return {
    type: DOWNLOAD_DEPENSE_CAISSE_DOCUMENT_ERROR,
    error,
  };
}

export function cleanupDepenseCaisseFormPageStoreAction() {
  return {
    type: CLEANUP_STORE_ACTION,
  };
}
