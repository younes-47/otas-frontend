/*
 *
 * Overview actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_REQUESTER_STATS,
  LOAD_REQUESTER_STATS_ERROR,
  LOAD_REQUESTER_STATS_SUCCESS,
  LOAD_USER_INFO,
  LOAD_USER_INFO_ERROR,
  LOAD_USER_INFO_SUCCESS,
  STORE_CLEANUP,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadUserInfoAction() {
  return {
    type: LOAD_USER_INFO,
  };
}
export function loadUserInfoSuccessAction(data) {
  return {
    type: LOAD_USER_INFO_SUCCESS,
    data,
  };
}
export function loadUserInfoErrorAction(error) {
  return {
    type: LOAD_USER_INFO_ERROR,
    error,
  };
}
export function loadRequesterStatsAction() {
  return {
    type: LOAD_REQUESTER_STATS,
  };
}
export function loadRequesterStatsSuccessAction(data) {
  return {
    type: LOAD_REQUESTER_STATS_SUCCESS,
    data,
  };
}
export function loadRequesterStatsErrorAction(error) {
  return {
    type: LOAD_REQUESTER_STATS_ERROR,
    error,
  };
}
export function cleanupStoreAction() {
  return {
    type: STORE_CLEANUP,
  };
}
