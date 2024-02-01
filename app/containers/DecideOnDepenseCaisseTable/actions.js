/*
 *
 * DecideOnDepenseCaisseTable actions
 *
 */

import {
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
  DOWNLOAD_DEPENSE_CAISSE_RECEIPTS,
  DOWNLOAD_DEPENSE_CAISSE_RECEIPTS_ERROR,
  DOWNLOAD_DEPENSE_CAISSE_RECEIPTS_SUCCESS,
  LOAD_DEPENSE_CAISSES,
  LOAD_DEPENSE_CAISSES_ERROR,
  LOAD_DEPENSE_CAISSES_SUCCESS,
  STATUS_DEPENSE_CAISSE,
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

export function cleanupDecideOnDepenseCaisseTableStoreAction() {
  return {
    type: CLEANUP_STORE_ACTION,
  };
}

export function setDepenseCaisseStatusAction(data) {
  return {
    type: STATUS_DEPENSE_CAISSE,
    data,
  };
}

export function downloadDepenseCaisseReceiptsFileAction(fileName) {
  return {
    type: DOWNLOAD_DEPENSE_CAISSE_RECEIPTS,
    fileName,
  };
}

export function downloadDepenseCaisseReceiptsFileSuccessAction(data) {
  return {
    type: DOWNLOAD_DEPENSE_CAISSE_RECEIPTS_SUCCESS,
    data,
  };
}

export function downloadDepenseCaisseReceiptsFileErrorAction(error) {
  return {
    type: DOWNLOAD_DEPENSE_CAISSE_RECEIPTS_ERROR,
    error,
  };
}
