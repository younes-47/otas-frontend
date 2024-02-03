/*
 *
 * DecideOnAvanceCaisseForm actions
 *
 */

import {
  CLEANUP_STORE_ACTION,
  CONFIRM_FUNDS_DELIVERY,
  CONFIRM_FUNDS_DELIVERY_ERROR,
  CONFIRM_FUNDS_DELIVERY_SUCCESS,
  DECIDE_ON_AVANCE_CAISSE,
  DECIDE_ON_AVANCE_CAISSE_ERROR,
  DECIDE_ON_AVANCE_CAISSE_SUCCESS,
  DEFAULT_ACTION,
  LOAD_AVANCE_CAISSE_DETAILS,
  LOAD_AVANCE_CAISSE_DETAILS_ERROR,
  LOAD_AVANCE_CAISSE_DETAILS_SUCCESS,
  MARK_FUNDS_AS_PREPARED,
  MARK_FUNDS_AS_PREPARED_ERROR,
  MARK_FUNDS_AS_PREPARED_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadAvanceCaisseDetailsAction(id) {
  return {
    type: LOAD_AVANCE_CAISSE_DETAILS,
    id,
  };
}
export function loadAvanceCaisseDetailsSuccessAction(data) {
  return {
    type: LOAD_AVANCE_CAISSE_DETAILS_SUCCESS,
    data,
  };
}

export function loadAvanceCaisseDetailsErrorAction(error) {
  return {
    type: LOAD_AVANCE_CAISSE_DETAILS_ERROR,
    error,
  };
}

export function decideOnAvanceCaisseAction(data) {
  return {
    type: DECIDE_ON_AVANCE_CAISSE,
    data,
  };
}
export function decideOnAvanceCaisseSuccessAction() {
  return {
    type: DECIDE_ON_AVANCE_CAISSE_SUCCESS,
  };
}

export function decideOnAvanceCaisseErrorAction(error) {
  return {
    type: DECIDE_ON_AVANCE_CAISSE_ERROR,
    error,
  };
}
export function markAvanceCaisseFundsAsPreparedAction(data) {
  return {
    type: MARK_FUNDS_AS_PREPARED,
    data,
  };
}
export function markAvanceCaisseFundsAsPreparedSuccessAction() {
  return {
    type: MARK_FUNDS_AS_PREPARED_SUCCESS,
  };
}

export function markAvanceCaisseFundsAsPreparedErrorAction(error) {
  return {
    type: MARK_FUNDS_AS_PREPARED_ERROR,
    error,
  };
}

export function confirmAvanceCaisseFundsDeliveryAction(data) {
  return {
    type: CONFIRM_FUNDS_DELIVERY,
    data,
  };
}
export function confirmAvanceCaisseFundsDeliverySuccessAction() {
  return {
    type: CONFIRM_FUNDS_DELIVERY_SUCCESS,
  };
}

export function confirmAvanceCaisseFundsDeliveryErrorAction(error) {
  return {
    type: CONFIRM_FUNDS_DELIVERY_ERROR,
    error,
  };
}

export function cleanupDecideOnAvanceCaisseFormPageAction() {
  return {
    type: CLEANUP_STORE_ACTION,
  };
}
