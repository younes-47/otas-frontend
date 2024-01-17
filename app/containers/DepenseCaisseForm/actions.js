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

export function cleanupStoreAction() {
  return {
    type: CLEANUP_STORE_ACTION,
  };
}
