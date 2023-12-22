/*
 *
 * DepenseCaisse actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_DEPENSE_CAISSES,
  LOAD_DEPENSE_CAISSES_ERROR,
  LOAD_DEPENSE_CAISSES_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadDepenseCaisseAction() {
  return {
    type: LOAD_DEPENSE_CAISSES,
  };
}

export function loadDepenseCaisseSuccessAction(data) {
  return {
    type: LOAD_DEPENSE_CAISSES_SUCCESS,
    data,
  };
}

export function loadDepenseCaisseErrorAction(error) {
  return {
    type: LOAD_DEPENSE_CAISSES_ERROR,
    error,
  };
}
