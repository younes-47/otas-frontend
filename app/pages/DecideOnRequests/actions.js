/*
 *
 * DecideOnRequests actions
 *
 */

import {
  DEFAULT_ACTION,
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
