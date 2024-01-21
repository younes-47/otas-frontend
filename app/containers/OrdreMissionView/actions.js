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
  SUBMIT_ORDRE_MISSION,
  SUBMIT_ORDRE_MISSION_ERROR,
  SUBMIT_ORDRE_MISSION_SUCCESS,
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
export function submitOrdreMissionAction(id) {
  return {
    type: SUBMIT_ORDRE_MISSION,
    id,
  };
}
export function submitOrdreMissionSuccessAction(data) {
  return {
    type: SUBMIT_ORDRE_MISSION_SUCCESS,
    data,
  };
}

export function submitOrdreMissionErrorAction(error) {
  return {
    type: SUBMIT_ORDRE_MISSION_ERROR,
    error,
  };
}

export function cleanupOrdreMissionViewStoreAction() {
  return {
    type: CLEANUP_STORE,
  };
}
