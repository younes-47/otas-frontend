/*
 *
 * DecideOnAvanceVoyageForm actions
 *
 */

import {
  CLEANUP_STORE_ACTION,
  DECIDE_ON_AVANCE_VOYAGE,
  DECIDE_ON_AVANCE_VOYAGE_ERROR,
  DECIDE_ON_AVANCE_VOYAGE_SUCCESS,
  DEFAULT_ACTION,
  LOAD_AVANCE_VOYAGE_DETAILS,
  LOAD_AVANCE_VOYAGE_DETAILS_ERROR,
  LOAD_AVANCE_VOYAGE_DETAILS_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadAvanceVoyageDetailsAction(id) {
  return {
    type: LOAD_AVANCE_VOYAGE_DETAILS,
    id,
  };
}
export function loadAvanceVoyageDetailsSuccessAction(data) {
  return {
    type: LOAD_AVANCE_VOYAGE_DETAILS_SUCCESS,
    data,
  };
}

export function loadAvanceVoyageDetailsErrorAction(error) {
  return {
    type: LOAD_AVANCE_VOYAGE_DETAILS_ERROR,
    error,
  };
}

export function decideOnAvanceVoyageAction(data) {
  return {
    type: DECIDE_ON_AVANCE_VOYAGE,
    data,
  };
}
export function decideOnAvanceVoyageSuccessAction() {
  return {
    type: DECIDE_ON_AVANCE_VOYAGE_SUCCESS,
  };
}

export function decideOnAvanceVoyageErrorAction(error) {
  return {
    type: DECIDE_ON_AVANCE_VOYAGE_ERROR,
    error,
  };
}

export function cleanupDecideOnAvanceVoyageFormPageAction() {
  return {
    type: CLEANUP_STORE_ACTION,
  };
}
