/*
 *
 * Liquidation actions
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

export function changeLiquidationParentPageContentAction(pageContent) {
  return {
    type: CHANGE_PAGE_CONTENT_ACTION,
    pageContent,
  };
}

export function cleanupliquidationParentPageStoreAction() {
  return {
    type: CLEANUP_STORE_ACTION,
  };
}

export function setLiquidationIdentityAction(id) {
  return {
    type: LIQUIDATION_IDENTITY,
    id,
  };
}
