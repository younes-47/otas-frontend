/*
 *
 * DecideOnAvanceCaisse reducer
 *
 */
import produce from 'immer';
import {
  AVANCE_CAISSE_IDENTITY,
  CHANGE_PAGE_CONTENT_ACTION,
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
} from './constants';

export const initialState = {
  avanceCaisseIdentity: null,
  pageContent: 'TABLE',
};

/* eslint-disable default-case, no-param-reassign */
const decideOnAvanceCaisseReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CHANGE_PAGE_CONTENT_ACTION:
        draft.pageContent = action.pageContent;
        break;
      case AVANCE_CAISSE_IDENTITY:
        draft.avanceCaisseIdentity = action.id;
        break;
      case CLEANUP_STORE_ACTION:
        draft.pageContent = 'TABLE';
        draft.avanceCaisseIdentity = null;
    }
  });

export default decideOnAvanceCaisseReducer;
