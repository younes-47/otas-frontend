/*
 *
 * OrdreMission actions
 *
 */

import {
  DEFAULT_ACTION,
  CHANGE_PAGE_CONTENT_ACTION,
  CLEANUP_STORE_ACTION,
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

export function cleanupStoreAction() {
  return {
    type: CLEANUP_STORE_ACTION,
  };
}
