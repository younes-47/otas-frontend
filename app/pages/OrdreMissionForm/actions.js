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
  ON_BEHALF_SELECTION,
  UPDATE_ORDRE_MISSION,
  UPDATE_ORDRE_MISSION_ERROR,
  UPDATE_ORDRE_MISSION_SUCCESS,
  VIEW_ORDRE_MISSION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function AddOrdreMissionAction() {
  return {
    type: ADD_ORDRE_MISSION,
  };
}

export function AddOrdreMissionSuccessAction() {
  return {
    type: ADD_ORDRE_MISSION_SUCCESS,
  };
}

export function AddOrdreMissionErrorAction() {
  return {
    type: ADD_ORDRE_MISSION_ERROR,
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
export function selectOnBehalf(selection) {
  return {
    type: ON_BEHALF_SELECTION,
    selection,
  };
}
