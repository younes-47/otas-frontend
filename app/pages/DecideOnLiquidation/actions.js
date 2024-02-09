/*
 *
 * DecideOnLiquidation actions
 *
 */

import {
  CHANGE_PAGE_CONTENT_ACTION,
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
  LIQUIDATION_IDENTITY,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changeDecideOnLiquidationParentPageContent(pageContent) {
  return {
    type: CHANGE_PAGE_CONTENT_ACTION,
    pageContent,
  };
}
export function setLiquidationIdentityAction(id) {
  return {
    type: LIQUIDATION_IDENTITY,
    id,
  };
}

export function cleanupDecideOnLiquidationParentPageStoreAction() {
  return {
    type: CLEANUP_STORE_ACTION,
  };
}
