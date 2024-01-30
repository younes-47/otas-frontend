/*
 *
 * DecideOnOrdreMissionForm actions
 *
 */

import {
  CLEANUP_STORE_ACTION,
  DECIDE_ON_ORDRE_MISSION,
  DECIDE_ON_ORDRE_MISSION_ERROR,
  DECIDE_ON_ORDRE_MISSION_SUCCESS,
  DEFAULT_ACTION,
  LOAD_ORDRE_MISSION_DETAILS,
  LOAD_ORDRE_MISSION_DETAILS_ERROR,
  LOAD_ORDRE_MISSION_DETAILS_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadOrdreMissionDetailsAction(id) {
  return {
    type: LOAD_ORDRE_MISSION_DETAILS,
    id,
  };
}
export function loadOrdreMissionDetailsSuccessAction(data) {
  return {
    type: LOAD_ORDRE_MISSION_DETAILS_SUCCESS,
    data,
  };
}

export function loadOrdreMissionDetailsErrorAction(error) {
  return {
    type: LOAD_ORDRE_MISSION_DETAILS_ERROR,
    error,
  };
}

export function decideOnOrdreMissionAction(data) {
  return {
    type: DECIDE_ON_ORDRE_MISSION,
    data,
  };
}
export function decideOnOrdreMissionActionSuccessAction() {
  return {
    type: DECIDE_ON_ORDRE_MISSION_SUCCESS,
  };
}

export function decideOnOrdreMissionErrorAction(error) {
  return {
    type: DECIDE_ON_ORDRE_MISSION_ERROR,
    error,
  };
}

export function cleanupDecideOnOrdreMissionFormPageAction() {
  return {
    type: CLEANUP_STORE_ACTION,
  };
}
