/*
 *
 * DecideOnAvanceVoyageForm actions
 *
 */

import {
  CLEANUP_STORE_ACTION,
  CONFIRM_FUNDS_DELIVERY,
  CONFIRM_FUNDS_DELIVERY_ERROR,
  CONFIRM_FUNDS_DELIVERY_SUCCESS,
  DECIDE_ON_AVANCE_VOYAGE,
  DECIDE_ON_AVANCE_VOYAGE_ERROR,
  DECIDE_ON_AVANCE_VOYAGE_SUCCESS,
  DEFAULT_ACTION,
  LOAD_AVANCE_VOYAGE_DETAILS,
  LOAD_AVANCE_VOYAGE_DETAILS_ERROR,
  LOAD_AVANCE_VOYAGE_DETAILS_SUCCESS,
  MARK_FUNDS_AS_PREPARED,
  MARK_FUNDS_AS_PREPARED_ERROR,
  MARK_FUNDS_AS_PREPARED_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadAvanceVoyageDetailsAction(id) {
  return {
    type: LOAD_AVANCE_VOYAGE_DETAILS,
    id,
  };
}
export function loadAvanceVoyageDetailsSuccessAction(data) {
  return {
    type: LOAD_AVANCE_VOYAGE_DETAILS_SUCCESS,
    data,
  };
}

export function loadAvanceVoyageDetailsErrorAction(error) {
  return {
    type: LOAD_AVANCE_VOYAGE_DETAILS_ERROR,
    error,
  };
}

export function decideOnAvanceVoyageAction(data) {
  return {
    type: DECIDE_ON_AVANCE_VOYAGE,
    data,
  };
}
export function decideOnAvanceVoyageSuccessAction() {
  return {
    type: DECIDE_ON_AVANCE_VOYAGE_SUCCESS,
  };
}

export function decideOnAvanceVoyageErrorAction(error) {
  return {
    type: DECIDE_ON_AVANCE_VOYAGE_ERROR,
    error,
  };
}

export function markAvanceVoyageFundsAsPreparedAction(data) {
  return {
    type: MARK_FUNDS_AS_PREPARED,
    data,
  };
}
export function markAvanceVoyageFundsAsPreparedSuccessAction() {
  return {
    type: MARK_FUNDS_AS_PREPARED_SUCCESS,
  };
}

export function markAvanceVoyageFundsAsPreparedErrorAction(error) {
  return {
    type: MARK_FUNDS_AS_PREPARED_ERROR,
    error,
  };
}

export function confirmAvanceVoyageFundsDeliveryAction(data) {
  return {
    type: CONFIRM_FUNDS_DELIVERY,
    data,
  };
}
export function confirmAvanceVoyageFundsDeliverySuccessAction() {
  return {
    type: CONFIRM_FUNDS_DELIVERY_SUCCESS,
  };
}

export function confirmAvanceVoyageFundsDeliveryErrorAction(error) {
  return {
    type: CONFIRM_FUNDS_DELIVERY_ERROR,
    error,
  };
}

export function cleanupDecideOnAvanceVoyageFormPageAction() {
  return {
    type: CLEANUP_STORE_ACTION,
  };
}
