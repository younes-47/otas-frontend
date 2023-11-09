/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  CHANGE_USERNAME,
  CHANGE_PASSWORD,
  LOGINPAGE_STORE_CLEANUP,
} from './constants';

export const initialState = {
  loading: false,
  error: true,
  token: '',
  role: '',
  username: '',
  password: '',
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOGIN_USER:
        draft.loading = true;
        draft.error = false;
        break;
      case LOGIN_USER_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.token = action.data.token;
        draft.role = action.data.role;
        break;
      case LOGIN_USER_ERROR:
        draft.loading = false;
        draft.password = '';
        draft.error = action.error;
        break;
      case CHANGE_USERNAME:
        draft.username = action.username;
        break;
      case CHANGE_PASSWORD:
        draft.password = action.password;
        break;
      case LOGINPAGE_STORE_CLEANUP:
        draft.loading = false;
        draft.error = true;
        draft.token = '';
        draft.role = '';
        draft.username = '';
        draft.password = '';
        break;
    }
  });

export default loginPageReducer;
