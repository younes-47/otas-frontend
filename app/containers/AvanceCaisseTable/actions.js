/*
 *
 * AvanceCaisseTable actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_AVANCE_CAISSES,
  LOAD_AVANCE_CAISSES_ERROR,
  LOAD_AVANCE_CAISSES_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadAvanceCaisseAction() {
  return {
    type: LOAD_AVANCE_CAISSES,
  };
}

export function loadAvanceCaisseSuccessAction(data) {
  return {
    type: LOAD_AVANCE_CAISSES_SUCCESS,
    data,
  };
}

export function loadAvanceCaisseErrorAction(error) {
  return {
    type: LOAD_AVANCE_CAISSES_ERROR,
    error,
  };
}
