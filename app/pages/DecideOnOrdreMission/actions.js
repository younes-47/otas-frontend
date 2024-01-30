/*
 *
 * DecideOnOrdreMission actions
 *
 */

import {
  CHANGE_PAGE_CONTENT_ACTION,
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
  ORDRE_MISSION_IDENTITY,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changePageContentAction(pageContent) {
  return {
    type: CHANGE_PAGE_CONTENT_ACTION,
    pageContent,
  };
}

export function cleanupParentDecideOnOrdreMissionPageAction() {
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
