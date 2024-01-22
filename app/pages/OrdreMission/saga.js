import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_ORDRE_MISSION_DETAILS, webService } from './constants';
import {
  loadOrdreMissionDetailsErrorAction,
  loadOrdreMissionDetailsSuccessAction,
} from './actions';

// Individual exports for testing
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

export default function* ordreMissionSaga() {
  yield takeLatest(LOAD_ORDRE_MISSION_DETAILS, loadOrdreMissionDetailsSaga);
}
