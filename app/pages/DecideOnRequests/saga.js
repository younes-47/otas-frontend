// import { take, call, put, select } from 'redux-saga/effects';

import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  LOAD_DECIDER_LEVELS,
  LOAD_DECIDER_STATS,
  WebService,
} from './constants';
import {
  loadDeciderLevelsErrorAction,
  loadDeciderLevelsSuccessAction,
  loadDeciderStatsErrorAction,
  loadDeciderStatsSuccessAction,
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

// Stats
export function* loadStats() {
  const token = localStorage.getItem('token');
  try {
    const { data } = yield call(request.get, WebService.LOAD_DECIDER_STATS, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    yield put(loadDeciderStatsSuccessAction(data));
  } catch (error) {
    yield put(loadDeciderStatsErrorAction(error));
  }
}

export default function* decideOnRequestsSaga() {
  yield takeLatest(LOAD_DECIDER_LEVELS, loadDeciderLevels);
  yield takeLatest(LOAD_DECIDER_STATS, loadStats);
}
