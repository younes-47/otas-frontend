/*
 *
 * DecideOnLiquidationTable actions
 *
 */

import {
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
  DOWNLOAD_LIQUIDATION_RECEIPTS,
  DOWNLOAD_LIQUIDATION_RECEIPTS_ERROR,
  DOWNLOAD_LIQUIDATION_RECEIPTS_SUCCESS,
  LOAD_LIQUIDATIONS,
  LOAD_LIQUIDATIONS_ERROR,
  LOAD_LIQUIDATIONS_SUCCESS,
  NULLIFY_ERROR_DELETING,
  STATUS_LIQUIDATION,
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

export function downloadLiquidationReceiptsFileAction(fileName) {
  return {
    type: DOWNLOAD_LIQUIDATION_RECEIPTS,
    fileName,
  };
}

export function downloadLiquidationReceiptsFileSuccessAction(data) {
  return {
    type: DOWNLOAD_LIQUIDATION_RECEIPTS_SUCCESS,
    data,
  };
}

export function downloadLiquidationReceiptsFileErrorAction(error) {
  return {
    type: DOWNLOAD_LIQUIDATION_RECEIPTS_ERROR,
    error,
  };
}

export function cleanupLiquidationTableStoreAction() {
  return {
    type: CLEANUP_STORE_ACTION,
  };
}

export function setLiquidationStatusAction(data) {
  return {
    type: STATUS_LIQUIDATION,
    data,
  };
}

export function nullifyErrorDeletingLiquidationAction() {
  return {
    type: NULLIFY_ERROR_DELETING,
  };
}
