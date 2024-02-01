/*
 *
 * DecideOnDepenseCaisseForm actions
 *
 */

import {
  CLEANUP_STORE_ACTION,
  DECIDE_ON_DEPENSE_CAISSE,
  DECIDE_ON_DEPENSE_CAISSE_ERROR,
  DECIDE_ON_DEPENSE_CAISSE_SUCCESS,
  DEFAULT_ACTION,
  LOAD_DEPENSE_CAISSE_DETAILS,
  LOAD_DEPENSE_CAISSE_DETAILS_ERROR,
  LOAD_DEPENSE_CAISSE_DETAILS_SUCCESS,
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

export function decideOnDepenseCaisseAction(data) {
  return {
    type: DECIDE_ON_DEPENSE_CAISSE,
    data,
  };
}
export function decideOnDepenseCaisseSuccessAction() {
  return {
    type: DECIDE_ON_DEPENSE_CAISSE_SUCCESS,
  };
}

export function decideOnDepenseCaisseErrorAction(error) {
  return {
    type: DECIDE_ON_DEPENSE_CAISSE_ERROR,
    error,
  };
}

export function cleanupDecideOnDepenseCaisseFormPageAction() {
  return {
    type: CLEANUP_STORE_ACTION,
  };
}
