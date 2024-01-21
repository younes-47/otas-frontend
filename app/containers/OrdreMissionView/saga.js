import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  LOAD_ORDRE_MISSION_DETAILS,
  SUBMIT_ORDRE_MISSION,
  webService,
} from './constants';
import {
  loadOrdreMissionDetailsErrorAction,
  loadOrdreMissionDetailsSuccessAction,
  submitOrdreMissionErrorAction,
  submitOrdreMissionSuccessAction,
} from './actions';

// Individual exports for testing
export function* loadOrdreMissionDetails({ id }) {
  try {
    const { data } = yield call(
      request.get,
      `${webService.LOAD_ORDRE_MISSION_DETAILS}?Id=${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    yield put(loadOrdreMissionDetailsSuccessAction(data));
  } catch (error) {
    yield put(loadOrdreMissionDetailsErrorAction(error));
  }
}

export function* submitOrdreMission({ id }) {
  try {
    yield call(request.get, `${webService.SUBMIT_ORDRE_MISSION}?Id=${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(submitOrdreMissionSuccessAction());
  } catch (error) {
    yield put(submitOrdreMissionErrorAction(error));
  }
}

// Individual exports for testing
export default function* ordreMissionViewSaga() {
  yield takeLatest(LOAD_ORDRE_MISSION_DETAILS, loadOrdreMissionDetails);
  yield takeLatest(SUBMIT_ORDRE_MISSION, submitOrdreMission);
}
