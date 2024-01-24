/*
 *
 * OrdreMission actions
 *
 */

import {
  DEFAULT_ACTION,
  CHANGE_PAGE_CONTENT_ACTION,
  CLEANUP_STORE_ACTION,
  ORDRE_MISSION_IDENTITY,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
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

export function setOrdreMissionIdentityAction(id) {
  return {
    type: ORDRE_MISSION_IDENTITY,
    id,
  };
}
