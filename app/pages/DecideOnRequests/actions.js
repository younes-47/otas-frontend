/*
 *
 * DecideOnRequests actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_DECIDER_LEVELS,
  LOAD_DECIDER_LEVELS_ERROR,
  LOAD_DECIDER_LEVELS_SUCCESS,
  STORE_CLEANUP,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function cleanupStoreAction() {
  return {
    type: STORE_CLEANUP,
  };
}

export function loadDeciderLevelsAction() {
  return {
    type: LOAD_DECIDER_LEVELS,
  };
}

export function loadDeciderLevelsSuccessAction(data) {
  return {
    type: LOAD_DECIDER_LEVELS_SUCCESS,
    data,
  };
}

export function loadDeciderLevelsErrorAction(error) {
  return {
    type: LOAD_DECIDER_LEVELS_ERROR,
    error,
  };
}
