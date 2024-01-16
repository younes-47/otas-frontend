// import { take, call, put, select } from 'redux-saga/effects';

import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_USER_INFO, WebService } from './constants';
import { loadUserInfoErrorAction, loadUserInfoSuccessAction } from './actions';

// UserInfo
export function* loadUserInfo() {
  const token = localStorage.getItem('token');
  try {
    const { data } = yield call(request.get, WebService.GET_USER_INFO, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    yield put(loadUserInfoSuccessAction(data)); // success action
  } catch (error) {
    yield put(loadUserInfoErrorAction(error)); // error action
  }
}

export default function* decideOnRequestsSaga() {
  yield takeLatest(LOAD_USER_INFO, loadUserInfo);
}
