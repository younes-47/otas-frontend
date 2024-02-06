/*
 *
 * LiquidationForm constants
 *
 */

export const DEFAULT_ACTION = 'app/LiquidationForm/DEFAULT_ACTION';

export const LOAD_LIQUIDATION_DETAILS =
  'app/LiquidationForm/LOAD_LIQUIDATION_DETAILS';
export const LOAD_LIQUIDATION_DETAILS_SUCCESS =
  'app/LiquidationForm/LOAD_LIQUIDATION_DETAILS_SUCCESS';
export const LOAD_LIQUIDATION_DETAILS_ERROR =
  'app/LiquidationForm/LOAD_LIQUIDATION_DETAILS_ERROR';

export const LOAD_REQUESTS_TO_LIQUIDATE =
  'app/LiquidationForm/LOAD_REQUESTS_TO_LIQUIDATE';
export const LOAD_REQUESTS_TO_LIQUIDATE_SUCCESS =
  'app/LiquidationForm/LOAD_REQUESTS_TO_LIQUIDATE_SUCCESS';
export const LOAD_REQUESTS_TO_LIQUIDATE_ERROR =
  'app/LiquidationForm/LOAD_REQUESTS_TO_LIQUIDATE_ERROR';

export const LOAD_REQUEST_TO_LIQUIDATE_DETAILS =
  'app/LiquidationForm/LOAD_REQUEST_TO_LIQUIDATE_DETAILS';
export const LOAD_REQUEST_TO_LIQUIDATE_DETAILS_SUCCESS =
  'app/LiquidationForm/LOAD_REQUEST_TO_LIQUIDATE_DETAILS_SUCCESS';
export const LOAD_REQUEST_TO_LIQUIDATE_DETAILS_ERROR =
  'app/LiquidationForm/LOAD_REQUEST_TO_LIQUIDATE_DETAILS_ERROR';

export const UPDATE_LIQUIDATION = 'app/LiquidationForm/UPDATE_LIQUIDATION';
export const UPDATE_LIQUIDATION_SUCCESS =
  'app/LiquidationForm/UPDATE_LIQUIDATION_SUCCESS';
export const UPDATE_LIQUIDATION_ERROR =
  'app/LiquidationForm/UPDATE_LIQUIDATION_ERROR';

export const SUBMIT_LIQUIDATION = 'app/LiquidationForm/SUBMIT_LIQUIDATION';
export const SUBMIT_LIQUIDATION_SUCCESS =
  'app/LiquidationForm/SUBMIT_LIQUIDATION_SUCCESS';
export const SUBMIT_LIQUIDATION_ERROR =
  'app/LiquidationForm/SUBMIT_LIQUIDATION_ERROR';

export const ADD_LIQUIDATION = 'app/LiquidationForm/ADD_LIQUIDATION';
export const ADD_LIQUIDATION_SUCCESS =
  'app/LiquidationForm/ADD_LIQUIDATION_SUCCESS';
export const ADD_LIQUIDATION_ERROR =
  'app/LiquidationForm/ADD_LIQUIDATION_ERROR';

export const CLEANUP_STORE_ACTION = 'app/LiquidationForm/CLEANUP_STORE_ACTION';

export const SELECT_REQUEST_TYPE_TO_LIQUIDATE =
  'app/LiquidationForm/SELECT_REQUEST_TYPE_TO_LIQUIDATE';

export const NULLIFY_REQUEST_TO_LIQUIDATE_DETAILS =
  'app/LiquidationForm/NULLIFY_REQUEST_TO_LIQUIDATE_DETAILS';

export const webService = {
  ADD_LIQUIDATION: '/Liquidation/Create',
  LOAD_LIQUIDATION_DETAILS: '/Liquidation/Requester/View',
  UPDATE_LIQUIDATION: '/Liquidation/Modify',
  SUBMIT_LIQUIDATION: '/Liquidation/Submit',
  LOAD_REQUESTS_TO_LIQUIDATE: '/Liquidation/Requests/Pending',
};
