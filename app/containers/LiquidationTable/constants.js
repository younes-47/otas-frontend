/*
 *
 * LiquidationTable constants
 *
 */

export const DEFAULT_ACTION = 'app/LiquidationTable/DEFAULT_ACTION';

export const LOAD_LIQUIDATIONS = 'app/LiquidationTable/LOAD_LIQUIDATIONS';
export const LOAD_LIQUIDATIONS_SUCCESS =
  'app/LiquidationTable/LOAD_LIQUIDATIONS_SUCCESS';
export const LOAD_LIQUIDATIONS_ERROR =
  'app/LiquidationTable/LOAD_LIQUIDATIONS_ERROR';

export const DOWNLOAD_LIQUIDATION_RECEIPTS =
  'app/LiquidationTable/DOWNLOAD_LIQUIDATION_RECEIPTS';
export const DOWNLOAD_LIQUIDATION_RECEIPTS_SUCCESS =
  'app/LiquidationTable/DOWNLOAD_LIQUIDATION_RECEIPTS_SUCCESS';
export const DOWNLOAD_LIQUIDATION_RECEIPTS_ERROR =
  'app/LiquidationTable/DOWNLOAD_LIQUIDATION_RECEIPTS_ERROR';

export const DELETE_LIQUIDATION = 'app/LiquidationTable/DELETE_LIQUIDATION';
export const DELETE_LIQUIDATION_SUCCESS =
  'app/LiquidationTable/DELETE_LIQUIDATION_SUCCESS';
export const DELETE_LIQUIDATION_ERROR =
  'app/LiquidationTable/DELETE_LIQUIDATION_ERROR';

export const STATUS_LIQUIDATION = 'app/LiquidationTable/STATUS_LIQUIDATION';

export const NULLIFY_ERROR_DELETING =
  'app/LiquidationTable/NULLIFY_ERROR_DELETING';

export const CLEANUP_STORE_ACTION = 'app/LiquidationTable/CLEANUP_STORE_ACTION';

export const webService = {
  LOAD_LIQUIDATIONS: '/Liquidation/Requester/Table',
  DELETE_LIQUIDATION: '/Liquidation/Delete',
  DOWNLOAD_RECEIPTS: '/Liquidation/ReceiptsFile/Download',
};
