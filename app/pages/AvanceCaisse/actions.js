/*
 *
 * AvanceCaisse actions
 *
 */

import {
  CHANGE_PAGE_CONTENT_ACTION,
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
  LOAD_AVANCE_CAISSE_DETAILS,
  LOAD_AVANCE_CAISSE_DETAILS_ERROR,
  LOAD_AVANCE_CAISSE_DETAILS_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadAvanceCaisseDetailsAction(id) {
  return {
    type: LOAD_AVANCE_CAISSE_DETAILS,
    id,
  };
}
export function loadAvanceCaisseDetailsSuccessAction(data) {
  return {
    type: LOAD_AVANCE_CAISSE_DETAILS_SUCCESS,
    data,
  };
}

export function loadAvanceCaisseDetailsErrorAction(error) {
  return {
    type: LOAD_AVANCE_CAISSE_DETAILS_ERROR,
    error,
  };
}

export function changePageContentAction(pageContent) {
  return {
    type: CHANGE_PAGE_CONTENT_ACTION,
    pageContent,
  };
}

export function cleanupStoreAction() {
  return {
    type: CLEANUP_STORE_ACTION,
  };
}
