/*
 *
 * OrdreMissionView actions
 *
 */

import {
  CLEANUP_STORE,
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

export function cleanupOrdreMissionViewStoreAction() {
  return {
    type: CLEANUP_STORE,
  };
}
