/*
 *
 * Overview reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  LOAD_FULL_NAME,
  LOAD_FULL_NAME_ERROR,
  LOAD_FULL_NAME_SUCCESS,
  OVERVIEW_STORE_CLEANUP,
} from './constants';

export const initialState = {
  loadingFullName: false,
  errorFullName: true,
  firstName: '',
  lastName: '',
};

/* eslint-disable default-case, no-param-reassign */
const overviewReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_FULL_NAME:
        draft.loadingFullName = true;
        draft.errorFullName = false;
        break;
      case LOAD_FULL_NAME_SUCCESS:
        draft.loadingFullName = false;
        draft.errorFullName = false;
        draft.firstName = action.data.firstName;
        draft.lastName = action.data.lastName;
        break;
      case LOAD_FULL_NAME_ERROR:
        draft.loadingFullName = false;
        draft.errorFullName = true;
        draft.errorFullName = action.error;
        break;
      case OVERVIEW_STORE_CLEANUP:
        draft.loadingFullName = false;
        draft.errorFullName = true;
        draft.firstName = '';
        draft.lastName = '';
    }
  });

export default overviewReducer;
