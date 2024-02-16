// import { take, call, put, select } from 'redux-saga/effects';

import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_DECIDER_LEVELS, WebService } from './constants';
import {
  loadDeciderLevelsErrorAction,
  loadDeciderLevelsSuccessAction,
} from './actions';

// UserInfo
export function* loadDeciderLevels() {
  const token = localStorage.getItem('token');
  try {
    const { data } = yield call(request.get, WebService.LOAD_DECIDER_LEVELS, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    yield put(loadDeciderLevelsSuccessAction(data));
  } catch (error) {
    yield put(loadDeciderLevelsErrorAction(error));
  }
}

// Individual exports for testing
export default function* sideBarSaga() {
  yield takeLatest(LOAD_DECIDER_LEVELS, loadDeciderLevels);
  // See example in containers/HomePage/saga.js
}
