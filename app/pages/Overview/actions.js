/*
 *
 * Overview actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_FULL_NAME,
  LOAD_FULL_NAME_ERROR,
  LOAD_FULL_NAME_SUCCESS,
  OVERVIEW_STORE_CLEANUP,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadFullNameAction(username) {
  return {
    type: LOAD_FULL_NAME,
    username,
  };
}
export function loadFullNameSuccessAction(data) {
  return {
    type: LOAD_FULL_NAME_SUCCESS,
    data,
  };
}
export function loadFullNameErrorAction(error) {
  return {
    type: LOAD_FULL_NAME_ERROR,
    error,
  };
}
export function overviewStoreCleanup() {
  return {
    type: OVERVIEW_STORE_CLEANUP,
  };
}
