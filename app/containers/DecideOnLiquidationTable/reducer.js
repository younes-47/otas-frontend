/*
 *
 * DecideOnLiquidationTable reducer
 *
 */
import produce from 'immer';
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

export const initialState = {
  loadingLiquidations: false,
  errorLoadingLiquidations: null,
  liquidations: [],
  downloadingLiquidationReceiptsFile: false,
  errorDownloadingLiquidationReceiptsFile: null,
  downloadLiquidationReceiptsFileResponse: null,
  statusLiquidation: '',
};

/* eslint-disable default-case, no-param-reassign */
const decideOnLiquidationTableReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_LIQUIDATIONS:
        draft.loadingLiquidations = true;
        draft.errorLoadingLiquidations = false;
        break;
      case LOAD_LIQUIDATIONS_ERROR:
        draft.loadingLiquidations = false;
        draft.errorLoadingLiquidations = action.error;
        break;
      case LOAD_LIQUIDATIONS_SUCCESS:
        draft.loadingLiquidations = false;
        draft.errorLoadingLiquidations = false;
        draft.liquidations = action.data;
        break;
      case DOWNLOAD_LIQUIDATION_RECEIPTS:
        draft.downloadingLiquidationReceiptsFile = true;
        draft.errorDownloadingLiquidationReceiptsFile = null;
        break;
      case DOWNLOAD_LIQUIDATION_RECEIPTS_SUCCESS:
        draft.downloadingLiquidationReceiptsFile = false;
        draft.errorDownloadingLiquidationReceiptsFile = false;
        draft.downloadLiquidationReceiptsFileResponse = action.data;
        break;
      case DOWNLOAD_LIQUIDATION_RECEIPTS_ERROR:
        draft.downloadingLiquidationReceiptsFile = false;
        draft.errorDownloadingLiquidationReceiptsFile = true;
        break;
      case STATUS_LIQUIDATION:
        draft.statusLiquidation = action.data;
        break;
      case NULLIFY_ERROR_DELETING:
        draft.errorDeletingOrdreMission = null;
        break;
      case CLEANUP_STORE_ACTION:
        draft.loadingLiquidations = false;
        draft.errorLoadingLiquidations = null;
        draft.liquidations = [];
        draft.downloadingLiquidationReceiptsFile = false;
        draft.errorDownloadingLiquidationReceiptsFile = null;
        draft.downloadLiquidationReceiptsFileResponse = null;
        draft.statusLiquidation = '';
        break;
    }
  });

export default decideOnLiquidationTableReducer;
