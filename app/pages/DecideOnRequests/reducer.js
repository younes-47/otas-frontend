/*
 *
 * DecideOnRequests reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  LOAD_DECIDER_STATS,
  LOAD_DECIDER_STATS_ERROR,
  LOAD_DECIDER_STATS_SUCCESS,
  STORE_CLEANUP,
} from './constants';

export const initialState = {
  loadingDeciderStats: false,
  errorLoadingDeciderStats: null,
  deciderStats: null,
};

/* eslint-disable default-case, no-param-reassign */
const decideOnRequestsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_DECIDER_STATS:
        draft.loadingDeciderStats = true;
        draft.errorLoadingDeciderStats = null;
        break;
      case LOAD_DECIDER_STATS_SUCCESS:
        draft.loadingDeciderStats = false;
        draft.errorLoadingDeciderStats = false;
        draft.deciderStats = action.data;
        break;
      case LOAD_DECIDER_STATS_ERROR:
        draft.loadingDeciderStats = false;
        draft.errorLoadingDeciderStats = true;
        break;
      case STORE_CLEANUP:
        draft.loadingDeciderStats = false;
        draft.errorLoadingDeciderStats = null;
        draft.deciderStats = null;
        break;
    }
  });

export default decideOnRequestsReducer;
