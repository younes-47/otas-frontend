/*
 *
 * DecideOnAvanceVoyageTable actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_AVANCE_VOYAGES,
  LOAD_AVANCE_VOYAGES_ERROR,
  LOAD_AVANCE_VOYAGES_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadAvanceVoyageAction() {
  return {
    type: LOAD_AVANCE_VOYAGES,
  };
}

export function loadAvanceVoyageSuccessAction(data) {
  return {
    type: LOAD_AVANCE_VOYAGES_SUCCESS,
    data,
  };
}

export function loadAvanceVoyageErrorAction(error) {
  return {
    type: LOAD_AVANCE_VOYAGES_ERROR,
    error,
  };
}
