/*
 *
 * Header reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  CHANGE_PREFERRED_LANGUAGE,
  CHANGE_PREFERRED_LANGUAGE_ERROR,
  CHANGE_PREFERRED_LANGUAGE_SUCCESS,
  SET_ERROR_MESSAGE,
} from './constants';

export const initialState = {
  preferredLanguage: '',
  changingPreferredLanguage: false,
  errorPreferredLanguage: true,
  errorMessage: null,
};

/* eslint-disable default-case, no-param-reassign */
const headerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CHANGE_PREFERRED_LANGUAGE:
        draft.changingPreferredLanguage = true;
        draft.errorPreferredLanguage = false;
        break;
      case CHANGE_PREFERRED_LANGUAGE_SUCCESS:
        draft.changingPreferredLanguage = false;
        draft.errorPreferredLanguage = false;
        localStorage.setItem(
          'preferredLanguage',
          action.data.preferredLanguage,
        );
        draft.preferredLanguage = action.data.preferredLanguage;
        break;
      case CHANGE_PREFERRED_LANGUAGE_ERROR:
        draft.changingPreferredLanguage = false;
        draft.errorProfile = action.error;
        break;
      case SET_ERROR_MESSAGE:
        draft.errorMessage = action.errorMessage;
        break;
    }
  });

export default headerReducer;
