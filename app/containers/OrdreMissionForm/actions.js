/*
 *
 * OrdreMissionForm actions
 *
 */

import {
  ADD_ORDRE_MISSION,
  ADD_ORDRE_MISSION_ERROR,
  ADD_ORDRE_MISSION_SUCCESS,
  DEFAULT_ACTION,
  CHANGE_ONBEHALF_SELECTION_ACTION,
  UPDATE_ORDRE_MISSION,
  UPDATE_ORDRE_MISSION_ERROR,
  UPDATE_ORDRE_MISSION_SUCCESS,
  VIEW_ORDRE_MISSION,
  CHANGE_ABROAD_ACTION,
  CHANGE_TRANSPORTATION_METHOD_ACTION,
  CLEANUP_STORE_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function AddOrdreMissionAction(data) {
  return {
    type: ADD_ORDRE_MISSION,
    data,
  };
}

export function AddOrdreMissionSuccessAction() {
  return {
    type: ADD_ORDRE_MISSION_SUCCESS,
  };
}

export function AddOrdreMissionErrorAction(error) {
  return {
    type: ADD_ORDRE_MISSION_ERROR,
    error,
  };
}

export function UpdateOrdreMisisonAction() {
  return {
    type: UPDATE_ORDRE_MISSION,
  };
}
export function UpdateOrdreMisisonSuccessAction() {
  return {
    type: UPDATE_ORDRE_MISSION_SUCCESS,
  };
}
export function UpdateOrdreMisisonErrorAction() {
  return {
    type: UPDATE_ORDRE_MISSION_ERROR,
  };
}
export function ViewOrdreMissionAction() {
  return {
    type: VIEW_ORDRE_MISSION,
  };
}
export function SelectOnBehalfAction(onBehalfSelection) {
  return {
    type: CHANGE_ONBEHALF_SELECTION_ACTION,
    onBehalfSelection,
  };
}
export function SelectAbroadAction(abroadSelection) {
  return {
    type: CHANGE_ABROAD_ACTION,
    abroadSelection,
  };
}
export function SelectTransportationMethodAction(
  transportationMethodSelection,
) {
  return {
    type: CHANGE_TRANSPORTATION_METHOD_ACTION,
    transportationMethodSelection,
  };
}

export function cleanupStoreAction() {
  return {
    type: CLEANUP_STORE_ACTION,
  };
}