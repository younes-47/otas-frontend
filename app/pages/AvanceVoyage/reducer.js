/*
 *
 * AvanceVoyage reducer
 *
 */
import produce from 'immer';
import {
  CHANGE_PAGE_CONTENT_ACTION,
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
} from './constants';

export const initialState = {
  loadingAvanceVoyages: false,
  errorLoadingAvanceVoyages: null,
  avanceVoyages: [],
  pageContent: 'TABLE',
};

/* eslint-disable default-case, no-param-reassign */
const avanceVoyageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CHANGE_PAGE_CONTENT_ACTION:
        draft.pageContent = action.pageContent;
        break;
      case CLEANUP_STORE_ACTION:
        draft.loadingAvanceVoyages = false;
        draft.errorLoadingAvanceVoyages = null;
        draft.avanceVoyages = [];
        draft.pageContent = 'TABLE';
    }
  });

export default avanceVoyageReducer;
