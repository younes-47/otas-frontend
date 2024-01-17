/*
 *
 * AvanceCaisseTable actions
 *
 */

import {
  ADDED_AVANCE_CAISSE,
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
  DELETE_AVANCE_CAISSE,
  DELETE_AVANCE_CAISSE_ERROR,
  DELETE_AVANCE_CAISSE_SUCCESS,
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

export function deleteAvanceCaisseAction(id) {
  return {
    type: DELETE_AVANCE_CAISSE,
    id,
  };
}

export function deleteAvanceCaisseSuccessAction(data) {
  return {
    type: DELETE_AVANCE_CAISSE_SUCCESS,
    data,
  };
}

export function deleteAvanceCaisseErrorAction(error) {
  return {
    type: DELETE_AVANCE_CAISSE_ERROR,
    error,
  };
}

export function cleanupAvanceCaisseTableStoreAction() {
  return {
    type: CLEANUP_STORE_ACTION,
  };
}

export function setAddedAvanceCaisseAction() {
  return {
    type: ADDED_AVANCE_CAISSE,
  };
}
