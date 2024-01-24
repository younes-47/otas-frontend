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

export function AddDepenseCaisseAction(data) {
  return {
    type: ADD_DEPENSE_CAISSE,
    data,
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

export function cleanupDepenseCaisseFormPageStoreAction() {
  return {
    type: CLEANUP_STORE_ACTION,
  };
}
