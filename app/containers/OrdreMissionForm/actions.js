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
  CHANGE_ABROAD_ACTION,
  CHANGE_TRANSPORTATION_METHOD_ACTION,
  CLEANUP_STORE_ACTION,
  UPDATE_ORDRE_MISSION,
  UPDATE_ORDRE_MISSION_SUCCESS,
  UPDATE_ORDRE_MISSION_ERROR,
  SUBMIT_ORDRE_MISSION,
  SUBMIT_ORDRE_MISSION_SUCCESS,
  SUBMIT_ORDRE_MISSION_ERROR,
  LOAD_STATIC_DATA,
  LOAD_STATIC_DATA_SUCCESS,
  LOAD_STATIC_DATA_ERROR,
  LOAD_ORDRE_MISSION_DETAILS,
  LOAD_ORDRE_MISSION_DETAILS_SUCCESS,
  LOAD_ORDRE_MISSION_DETAILS_ERROR,
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

export function LoadStaticDataAction() {
  return {
    type: LOAD_STATIC_DATA,
  };
}

export function LoadStaticDataSuccessAction(data) {
  return {
    type: LOAD_STATIC_DATA_SUCCESS,
    data,
  };
}

export function LoadStaticDataErrorAction(error) {
  return {
    type: LOAD_STATIC_DATA_ERROR,
    error,
  };
}

export function AddOrdreMissionAction(form) {
  return {
    type: ADD_ORDRE_MISSION,
    form,
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

export function UpdateOrdreMissionAction(form) {
  return {
    type: UPDATE_ORDRE_MISSION,
    form,
  };
}

export function UpdateOrdreMissionSuccessAction() {
  return {
    type: UPDATE_ORDRE_MISSION_SUCCESS,
  };
}

export function UpdateOrdreMissionErrorAction(error) {
  return {
    type: UPDATE_ORDRE_MISSION_ERROR,
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

export function cleanupOrdreMissionFormPageAction() {
  return {
    type: CLEANUP_STORE_ACTION,
  };
}
