/*
 *
 * AvanceVoyage actions
 *
 */

import {
  AVANCE_VOYAGE_IDENTITY,
  CHANGE_PAGE_CONTENT_ACTION,
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
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

export function cleanupStoreAction() {
  return {
    type: CLEANUP_STORE_ACTION,
  };
}

export function setAvanceVoyageIdentityAction(data) {
  return {
    type: AVANCE_VOYAGE_IDENTITY,
    data,
  };
}
