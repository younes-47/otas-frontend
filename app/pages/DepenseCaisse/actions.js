/*
 *
 * DepenseCaisse actions
 *
 */

import {
  CHANGE_PAGE_CONTENT_ACTION,
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
  LLOAD_DEPENSE_CAISSE_DETAILS_ERROR,
  LOAD_DEPENSE_CAISSE_DETAILS,
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
    type: LLOAD_DEPENSE_CAISSE_DETAILS_ERROR,
    error,
  };
}

export function changePageContentAction(pageContent) {
  return {
    type: CHANGE_PAGE_CONTENT_ACTION,
    pageContent,
  };
}

export function cleanupDepesneCaisseParentPageStoreAction() {
  return {
    type: CLEANUP_STORE_ACTION,
  };
}
