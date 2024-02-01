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
  DEPENSE_CAISSE_IDENTITY,
} from './constants';

export const initialState = {
  depenseCaisseIdentity: null,
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
      case DEPENSE_CAISSE_IDENTITY:
        draft.depenseCaisseIdentity = action.id;
        break;
      case CLEANUP_STORE_ACTION:
        draft.pageContent = 'TABLE';
        draft.depenseCaisseIdentity = null;
    }
  });

export default decideOnDepenseCaisseReducer;
