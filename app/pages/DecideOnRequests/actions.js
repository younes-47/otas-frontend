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
  LOAD_DECIDER_STATS,
  LOAD_DECIDER_STATS_ERROR,
  LOAD_DECIDER_STATS_SUCCESS,
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

export function loadDeciderStatsAction() {
  return {
    type: LOAD_DECIDER_STATS,
  };
}
export function loadDeciderStatsSuccessAction(data) {
  return {
    type: LOAD_DECIDER_STATS_SUCCESS,
    data,
  };
}
export function loadDeciderStatsErrorAction(error) {
  return {
    type: LOAD_DECIDER_STATS_ERROR,
    error,
  };
}
