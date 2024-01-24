/*
 *
 * AvanceCaisse actions
 *
 */

import {
  AVANCE_CAISSE_IDENTITY,
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

export function cleanupAvanceCaisseParentPageStoreAction() {
  return {
    type: CLEANUP_STORE_ACTION,
  };
}

export function setAvanceCaisseIdentityAction(id) {
  return {
    type: AVANCE_CAISSE_IDENTITY,
    id,
  };
}
