/*
 *
 * DepenseCaisse actions
 *
 */

import {
  CHANGE_PAGE_CONTENT_ACTION,
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
  DEPENSE_CAISSE_IDENTITY,
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

export function cleanupDepenseCaisseParentPageStoreAction() {
  return {
    type: CLEANUP_STORE_ACTION,
  };
}

export function setDepenseCaisseIdentityAction(id) {
  return {
    type: DEPENSE_CAISSE_IDENTITY,
    id,
  };
}
