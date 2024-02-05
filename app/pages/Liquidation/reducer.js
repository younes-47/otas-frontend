/*
 *
 * Liquidation reducer
 *
 */
import produce from 'immer';
import {
  CHANGE_PAGE_CONTENT_ACTION,
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
  LIQUIDATION_IDENTITY,
} from './constants';

export const initialState = {
  liquidationIdentity: null,
  pageContent: 'TABLE',
};

/* eslint-disable default-case, no-param-reassign */
const liquidationReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LIQUIDATION_IDENTITY:
        draft.liquidationIdentity = action.id;
        break;
      case CHANGE_PAGE_CONTENT_ACTION:
        draft.pageContent = action.pageContent;
        break;
      case CLEANUP_STORE_ACTION:
        draft.liquidationIdentity = null;
        draft.pageContent = 'TABLE';
        break;
    }
  });

export default liquidationReducer;
