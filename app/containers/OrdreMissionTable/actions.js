/*
 *
 * OrdreMissionTable actions
 *
 */

import {
  DEFAULT_ACTION,
  DELETE_ORDRE_MISSION,
  DELETE_ORDRE_MISSION_ERROR,
  DELETE_ORDRE_MISSION_SUCCESS,
  LOAD_ORDRE_MISSIONS,
  LOAD_ORDRE_MISSIONS_ERROR,
  LOAD_ORDRE_MISSIONS_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadOrdreMissionAction() {
  return {
    type: LOAD_ORDRE_MISSIONS,
  };
}

export function loadOrdreMissionSuccessAction(data) {
  return {
    type: LOAD_ORDRE_MISSIONS_SUCCESS,
    data,
  };
}

export function loadOrdreMissionErrorAction(error) {
  return {
    type: LOAD_ORDRE_MISSIONS_ERROR,
    error,
  };
}

export function deleteOrdreMissionAction(id) {
  return {
    type: DELETE_ORDRE_MISSION,
    id,
  };
}

export function deleteOrdreMissionSuccessAction() {
  return {
    type: DELETE_ORDRE_MISSION_SUCCESS,
  };
}

export function deleteOrdreMissionErrorAction(error) {
  return {
    type: DELETE_ORDRE_MISSION_ERROR,
    error,
  };
}
