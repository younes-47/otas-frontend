import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { loadOrdreMissionSuccessAction, loadOrdreMissionErrorAction } from './actions';
import { LOAD_ORDRE_MISSIONS, webService } from './constants';
// Individual exports for testing

export function* loadOrdreMission() {
  try {
    const { data } = yield call(
      request.get,
      webService.LOAD_ORDRE_MISSION + "?userId=4",
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    yield put(loadOrdreMissionSuccessAction(data))
  }
  catch (error) {
    yield put(loadOrdreMissionErrorAction(error))
  }
}

export default function* ordreMissionSaga() {
  yield takeLatest(LOAD_ORDRE_MISSIONS, loadOrdreMission)
}
