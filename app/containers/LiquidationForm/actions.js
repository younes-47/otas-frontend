/*
 *
 * LiquidationForm actions
 *
 */

import {
  ADD_LIQUIDATION,
  ADD_LIQUIDATION_ERROR,
  ADD_LIQUIDATION_SUCCESS,
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
  LOAD_LIQUIDATION_DETAILS,
  LOAD_LIQUIDATION_DETAILS_ERROR,
  LOAD_LIQUIDATION_DETAILS_SUCCESS,
  LOAD_REQUESTS_TO_LIQUIDATE,
  LOAD_REQUESTS_TO_LIQUIDATE_ERROR,
  LOAD_REQUESTS_TO_LIQUIDATE_SUCCESS,
  LOAD_REQUEST_TO_LIQUIDATE_DETAILS,
  LOAD_REQUEST_TO_LIQUIDATE_DETAILS_ERROR,
  LOAD_REQUEST_TO_LIQUIDATE_DETAILS_SUCCESS,
  SELECT_REQUEST_TYPE_TO_LIQUIDATE,
  SUBMIT_LIQUIDATION,
  SUBMIT_LIQUIDATION_ERROR,
  SUBMIT_LIQUIDATION_SUCCESS,
  UPDATE_LIQUIDATION,
  UPDATE_LIQUIDATION_ERROR,
  UPDATE_LIQUIDATION_SUCCESS,
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

export function AddLiquidationAction(form) {
  return {
    type: ADD_LIQUIDATION,
    form,
  };
}

export function AddLiquidationErrorAction(error) {
  return {
    type: ADD_LIQUIDATION_ERROR,
    error,
  };
}
export function AddLiquidationSuccessAction() {
  return {
    type: ADD_LIQUIDATION_SUCCESS,
  };
}

export function UpdateLiquidationAction(form) {
  return {
    type: UPDATE_LIQUIDATION,
    form,
  };
}

export function UpdateLiquidationSuccessAction() {
  return {
    type: UPDATE_LIQUIDATION_SUCCESS,
  };
}

export function UpdateLiquidationErrorAction(error) {
  return {
    type: UPDATE_LIQUIDATION_ERROR,
    error,
  };
}

export function submitLiquidationAction(id) {
  return {
    type: SUBMIT_LIQUIDATION,
    id,
  };
}
export function submitLiquidationSuccessAction(data) {
  return {
    type: SUBMIT_LIQUIDATION_SUCCESS,
    data,
  };
}

export function submitLiquidationErrorAction(error) {
  return {
    type: SUBMIT_LIQUIDATION_ERROR,
    error,
  };
}

export function loadRequestsToLiquidateAction(requestType) {
  return {
    type: LOAD_REQUESTS_TO_LIQUIDATE,
    requestType,
  };
}
export function loadRequestsToLiquidateSuccessAction(data) {
  return {
    type: LOAD_REQUESTS_TO_LIQUIDATE_SUCCESS,
    data,
  };
}
export function loadRequestsToLiquidateErrorAction(error) {
  return {
    type: LOAD_REQUESTS_TO_LIQUIDATE_ERROR,
    error,
  };
}

export function loadRequestToLiquidateDetailsAction(id, requestType) {
  return {
    type: LOAD_REQUEST_TO_LIQUIDATE_DETAILS,
    id,
    requestType,
  };
}
export function loadRequestToLiquidateDetailsSuccessAction(data) {
  return {
    type: LOAD_REQUEST_TO_LIQUIDATE_DETAILS_SUCCESS,
    data,
  };
}
export function loadRequestToLiquidateDetailsErrorAction(error) {
  return {
    type: LOAD_REQUEST_TO_LIQUIDATE_DETAILS_ERROR,
    error,
  };
}

export function cleanupLiquidationFormPageStoreAction() {
  return {
    type: CLEANUP_STORE_ACTION,
  };
}

export function selectRequestTypeToLiquidateAction(selection) {
  return {
    type: SELECT_REQUEST_TYPE_TO_LIQUIDATE,
    selection,
  };
}
