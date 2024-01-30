import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  decideOnOrdreMissionActionSuccessAction,
  decideOnOrdreMissionErrorAction,
  loadOrdreMissionDetailsErrorAction,
  loadOrdreMissionDetailsSuccessAction,
} from './actions';
import {
  DECIDE_ON_ORDRE_MISSION,
  LOAD_ORDRE_MISSION_DETAILS,
  webService,
} from './constants';

export function* loadOrdreMissionDetailsSaga({ id }) {
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

export function* decideOnOrdreMissionSaga({ data }) {
  try {
    yield call(request.put, webService.DECIDE_ON_ORDRE_MISSION, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(decideOnOrdreMissionActionSuccessAction());
  } catch (error) {
    yield put(decideOnOrdreMissionErrorAction(error));
  }
}

// Individual exports for testing
export default function* decideOnOrdreMissionFormSaga() {
  yield takeLatest(LOAD_ORDRE_MISSION_DETAILS, loadOrdreMissionDetailsSaga);
  yield takeLatest(DECIDE_ON_ORDRE_MISSION, decideOnOrdreMissionSaga);
}
