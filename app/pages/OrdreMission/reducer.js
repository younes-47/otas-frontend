/*
 *
 * OrdreMission reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  CHANGE_PAGE_CONTENT_ACTION,
  CLEANUP_STORE_ACTION,
} from './constants';

export const initialState = {
  loadingOrdreMissions: false,
  errorLoadingOrdreMissions: null,
  ordreMissions: [],
  pageContent: 'TABLE',
};

/* eslint-disable default-case, no-param-reassign */
const ordreMissionReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CHANGE_PAGE_CONTENT_ACTION:
        draft.pageContent = action.pageContent;
        break;
      case CLEANUP_STORE_ACTION:
        draft.loadingOrdreMissions = false;
        draft.errorLoadingOrdreMissions = null;
        draft.ordreMissions = [];
        draft.pageContent = 'TABLE';
        break;
    }
  });

export default ordreMissionReducer;
