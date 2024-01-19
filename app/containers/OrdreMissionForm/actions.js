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
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function AddOrdreMissionAction(form) {
  return {
    type: ADD_ORDRE_MISSION,
    form,
  };
}

export function AddOrdreMissionSuccessAction(id) {
  return {
    type: ADD_ORDRE_MISSION_SUCCESS,
    id,
  };
}

export function AddOrdreMissionErrorAction(error) {
  return {
    type: ADD_ORDRE_MISSION_ERROR,
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

export function cleanupStoreAction() {
  return {
    type: CLEANUP_STORE_ACTION,
  };
}
