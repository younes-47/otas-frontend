/*
 *
 * DecideOnAvanceVoyage actions
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

export function changeDecideOnAvanceVoyagePageContentAction(pageContent) {
  return {
    type: CHANGE_PAGE_CONTENT_ACTION,
    pageContent,
  };
}

export function cleanupParentDecideOnAvanceVoyageStoreAction() {
  return {
    type: CLEANUP_STORE_ACTION,
  };
}

export function setAvanceVoyageIdentityAction(id) {
  return {
    type: AVANCE_VOYAGE_IDENTITY,
    id,
  };
}
