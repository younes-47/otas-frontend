/*
 *
 * DecideOnAvanceCaisseTable actions
 *
 */

import {
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
  LOAD_AVANCE_CAISSES,
  LOAD_AVANCE_CAISSES_ERROR,
  LOAD_AVANCE_CAISSES_SUCCESS,
  STATUS_AVANCE_CAISSE,
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

export function cleanupDecideOnAvanceCaisseTableStoreAction() {
  return {
    type: CLEANUP_STORE_ACTION,
  };
}

export function setAvanceCaisseStatusAction(data) {
  return {
    type: STATUS_AVANCE_CAISSE,
    data,
  };
}
