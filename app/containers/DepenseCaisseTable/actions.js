/*
 *
 * DepenseCaisse actions
 *
 */

import {
  ADDED_DEPENSE_CAISSE,
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
  DELETE_DEPENSE_CAISSE,
  DELETE_DEPENSE_CAISSE_ERROR,
  DELETE_DEPENSE_CAISSE_SUCCESS,
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

export function deleteDepenseCaisseAction(id) {
  return {
    type: DELETE_DEPENSE_CAISSE,
    id,
  };
}

export function deleteDepenseCaisseSuccessAction(data) {
  return {
    type: DELETE_DEPENSE_CAISSE_SUCCESS,
    data,
  };
}

export function deleteDepenseCaisseErrorAction(error) {
  return {
    type: DELETE_DEPENSE_CAISSE_ERROR,
    error,
  };
}

export function cleanupDepenseCaisseTableStoreAction() {
  return {
    type: CLEANUP_STORE_ACTION,
  };
}

export function setAddedDepenseCaisseAction() {
  return {
    type: ADDED_DEPENSE_CAISSE,
  };
}
