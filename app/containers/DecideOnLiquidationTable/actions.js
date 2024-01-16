/*
 *
 * DecideOnLiquidationTable actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_LIQUIDATIONS,
  LOAD_LIQUIDATIONS_ERROR,
  LOAD_LIQUIDATIONS_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadLiquidationAction() {
  return {
    type: LOAD_LIQUIDATIONS,
  };
}

export function loadLiquidationSuccessAction(data) {
  return {
    type: LOAD_LIQUIDATIONS_SUCCESS,
    data,
  };
}

export function loadLiquidationErrorAction(error) {
  return {
    type: LOAD_LIQUIDATIONS_ERROR,
    error,
  };
}
