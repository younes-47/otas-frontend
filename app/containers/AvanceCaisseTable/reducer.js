/*
 *
 * AvanceCaisseTable reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  LOAD_AVANCE_CAISSES,
  LOAD_AVANCE_CAISSES_ERROR,
  LOAD_AVANCE_CAISSES_SUCCESS,
} from './constants';

export const initialState = {
  loadingAvanceCaisses: false,
  errorLoadingAvanceCaisses: null,
  avanceCaisses: [],
};

/* eslint-disable default-case, no-param-reassign */
const avanceCaisseTableReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_AVANCE_CAISSES:
        draft.loadingAvanceCaisses = true;
        draft.errorLoadingAvanceCaisses = false;
        break;
      case LOAD_AVANCE_CAISSES_ERROR:
        draft.loadingAvanceCaisses = false;
        draft.errorLoadingAvanceCaisses = action.error;
        break;
      case LOAD_AVANCE_CAISSES_SUCCESS:
        draft.loadingAvanceCaisses = false;
        draft.errorLoadingAvanceCaisses = false;
        draft.avanceCaisses = action.data;
        break;
    }
  });

export default avanceCaisseTableReducer;
