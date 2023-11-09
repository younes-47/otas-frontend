/*
 *
 * LoginPage actions
 *
 */

import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  CHANGE_USERNAME,
  CHANGE_PASSWORD,
  LOGINPAGE_STORE_CLEANUP,
} from './constants';

export function loginUserAction(username, password) {
  return {
    type: LOGIN_USER,
    username,
    password,
  };
}
export function loginUserSuccessAction(data) {
  return {
    type: LOGIN_USER_SUCCESS,
    data,
  };
}
export function loginUserErrorAction(error) {
  return {
    type: LOGIN_USER_ERROR,
    error,
  };
}
export function changeUsernameAction(username) {
  return {
    type: CHANGE_USERNAME,
    username,
  };
}
export function changePasswordAction(password) {
  return {
    type: CHANGE_PASSWORD,
    password,
  };
}
export function loginPageStoreCleanupAction() {
  return {
    type: LOGINPAGE_STORE_CLEANUP,
  };
}
