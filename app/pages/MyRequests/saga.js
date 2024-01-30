// import { take, call, put, select } from 'redux-saga/effects';

import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_REQUESTER_STATS, LOAD_USER_INFO, WebService } from './constants';
import {
  loadRequesterStatsErrorAction,
  loadRequesterStatsSuccessAction,
  loadUserInfoErrorAction,
  loadUserInfoSuccessAction,
} from './actions';

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
    yield put(loadUserInfoSuccessAction(data));
  } catch (error) {
    yield put(loadUserInfoErrorAction(error));
  }
}

// Stats
export function* loadStats() {
  const token = localStorage.getItem('token');
  try {
    const { data } = yield call(request.get, WebService.LOAD_REQUESTER_STATS, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    yield put(loadRequesterStatsSuccessAction(data));
  } catch (error) {
    yield put(loadRequesterStatsErrorAction(error));
  }
}
// Individual exports for testing
export default function* myRequestsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOAD_USER_INFO, loadUserInfo);
  yield takeLatest(LOAD_REQUESTER_STATS, loadStats);
}
