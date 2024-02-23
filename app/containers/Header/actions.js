/*
 *
 * Header actions
 *
 */

import {
  DEFAULT_ACTION,
  CHANGE_PREFERRED_LANGUAGE,
  CHANGE_PREFERRED_LANGUAGE_ERROR,
  CHANGE_PREFERRED_LANGUAGE_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function changePreferredLanguageAction(preferredLanguage) {
  return {
    type: CHANGE_PREFERRED_LANGUAGE,
    preferredLanguage,
  };
}
export function changePreferredLanguageSuccessAction(data) {
  return {
    type: CHANGE_PREFERRED_LANGUAGE_SUCCESS,
    data,
  };
}
export function changePreferredLanguageErrorAction(error) {
  return {
    type: CHANGE_PREFERRED_LANGUAGE_ERROR,
    error,
  };
}
