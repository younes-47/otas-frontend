/*
 *
 * DecideOnLiquidationTable reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  LOAD_LIQUIDATIONS,
  LOAD_LIQUIDATIONS_ERROR,
  LOAD_LIQUIDATIONS_SUCCESS,
} from './constants';

export const initialState = {
  loadingLiquidations: false,
  errorLoadingLiquidations: null,
  liquidations: [],
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
    }
  });

export default decideOnLiquidationTableReducer;
