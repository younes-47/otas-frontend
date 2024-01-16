/*
 *
 * DecideOnDepenseCaisse reducer
 *
 */
import produce from 'immer';
import {
  CHANGE_PAGE_CONTENT_ACTION,
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
} from './constants';

export const initialState = {
  loadingDepenseCaisses: false,
  errorLoadingDepenseCaisses: null,
  depenseCaisses: [],
  pageContent: 'TABLE',
};

/* eslint-disable default-case, no-param-reassign */
const decideOnDepenseCaisseReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CHANGE_PAGE_CONTENT_ACTION:
        draft.pageContent = action.pageContent;
        break;
      case CLEANUP_STORE_ACTION:
        draft.loadingDepenseCaisses = false;
        draft.errorLoadingDepenseCaisses = null;
        draft.depenseCaisses = [];
        draft.pageContent = 'TABLE';
    }
  });

export default decideOnDepenseCaisseReducer;
