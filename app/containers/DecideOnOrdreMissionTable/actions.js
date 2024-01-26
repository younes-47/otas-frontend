/*
 *
 * DecideOnOrdreMissionTable actions
 *
 */

import {
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
  LOAD_ORDRE_MISSIONS,
  LOAD_ORDRE_MISSIONS_ERROR,
  LOAD_ORDRE_MISSIONS_SUCCESS,
  STATUS_ORDRE_MISSION,
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

export function cleanupDecideOnOrdreMissionTableStoreAction() {
  return {
    type: CLEANUP_STORE_ACTION,
  };
}

export function setOrdreMissionStatusAction(data) {
  return {
    type: STATUS_ORDRE_MISSION,
    data,
  };
}
