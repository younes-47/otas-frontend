/*
 *
 * AvanceVoyageView actions
 *
 */

import {
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
  LOAD_AVANCE_VOYAGE,
  LOAD_AVANCE_VOYAGE_ERROR,
  LOAD_AVANCE_VOYAGE_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadAvanceVoyageAction(id) {
  return {
    type: LOAD_AVANCE_VOYAGE,
    id,
  };
}

export function loadAvanceVoyageSuccessAction(data) {
  return {
    type: LOAD_AVANCE_VOYAGE_SUCCESS,
    data,
  };
}

export function loadAvanceVoyageErrorAction(error) {
  return {
    type: LOAD_AVANCE_VOYAGE_ERROR,
    error,
  };
}

export function cleanupAvanceVoyageViewStoreAction() {
  return {
    type: CLEANUP_STORE_ACTION,
  };
}
