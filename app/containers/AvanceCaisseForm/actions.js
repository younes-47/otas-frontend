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

export function AddAvanceCaisseAction(data) {
  return {
    type: ADD_AVANCE_CAISSE,
    data,
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

export function cleanupStoreAction() {
  return {
    type: CLEANUP_STORE_ACTION,
  };
}
