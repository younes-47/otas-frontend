/*
 *
 * OrdreMission actions
 *
 */

import {
  DEFAULT_ACTION,
  CHANGE_PAGE_CONTENT_ACTION,
  CLEANUP_STORE_ACTION,
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

export function ChangePageContentAction(pageContent) {
  return {
    type: CHANGE_PAGE_CONTENT_ACTION,
    pageContent,
  };
}

export function cleanupParentOrdreMissionPageAction() {
  return {
    type: CLEANUP_STORE_ACTION,
  };
}
