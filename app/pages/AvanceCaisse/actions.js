/*
 *
 * AvanceCaisse actions
 *
 */

import {
  CHANGE_PAGE_CONTENT_ACTION,
  CLEANUP_STORE_ACTION,
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
