import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { SUBMIT_ORDRE_MISSION, webService } from './constants';
import {
  submitOrdreMissionErrorAction,
  submitOrdreMissionSuccessAction,
} from './actions';

// Individual exports for testing

export function* submitOrdreMission({ id }) {
  try {
    yield call(request.put, `${webService.SUBMIT_ORDRE_MISSION}?Id=${id}`, {
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
  yield takeLatest(SUBMIT_ORDRE_MISSION, submitOrdreMission);
}
