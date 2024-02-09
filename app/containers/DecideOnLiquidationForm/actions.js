/*
 *
 * DecideOnLiquidationForm actions
 *
 */

import {
  CLEANUP_STORE_ACTION,
  DECIDE_ON_LIQUIDATION,
  DECIDE_ON_LIQUIDATION_ERROR,
  DECIDE_ON_LIQUIDATION_SUCCESS,
  DEFAULT_ACTION,
  LOAD_LIQUIDATION_DETAILS,
  LOAD_LIQUIDATION_DETAILS_ERROR,
  LOAD_LIQUIDATION_DETAILS_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadLiquidationDetailsAction(id) {
  return {
    type: LOAD_LIQUIDATION_DETAILS,
    id,
  };
}
export function loadLiquidationDetailsSuccessAction(data) {
  return {
    type: LOAD_LIQUIDATION_DETAILS_SUCCESS,
    data,
  };
}

export function loadLiquidationDetailsErrorAction(error) {
  return {
    type: LOAD_LIQUIDATION_DETAILS_ERROR,
    error,
  };
}

export function decideOnLiquidationAction(data) {
  return {
    type: DECIDE_ON_LIQUIDATION,
    data,
  };
}
export function decideOnLiquidationSuccessAction() {
  return {
    type: DECIDE_ON_LIQUIDATION_SUCCESS,
  };
}

export function decideOnLiquidationErrorAction(error) {
  return {
    type: DECIDE_ON_LIQUIDATION_ERROR,
    error,
  };
}

export function cleanupDecideOnLiquidationFormPageAction() {
  return {
    type: CLEANUP_STORE_ACTION,
  };
}
