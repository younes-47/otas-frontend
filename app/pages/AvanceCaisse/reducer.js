/*
 *
 * AvanceCaisse reducer
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
  pageContent: 'TABLE',
  avanceCaisseIdentity: null,
};
/* eslint-disable default-case, no-param-reassign */
const avanceCaisseReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case AVANCE_CAISSE_IDENTITY:
        draft.avanceCaisseIdentity = action.id;
        break;
      case CHANGE_PAGE_CONTENT_ACTION:
        draft.pageContent = action.pageContent;
        break;
      case CLEANUP_STORE_ACTION:
        draft.avanceCaisseIdentity = null;
        draft.pageContent = 'TABLE';
        break;
    }
  });

export default avanceCaisseReducer;
