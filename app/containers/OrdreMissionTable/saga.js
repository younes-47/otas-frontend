import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  loadOrdreMissionSuccessAction,
  loadOrdreMissionErrorAction,
  deleteOrdreMissionErrorAction,
  deleteOrdreMissionSuccessAction,
} from './actions';
import {
  DELETE_ORDRE_MISSION,
  LOAD_ORDRE_MISSIONS,
  webService,
} from './constants';

export function* loadOrdreMission() {
  try {
    const { data } = yield call(
      request.get,
      `${webService.LOAD_ORDRE_MISSION}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    yield put(loadOrdreMissionSuccessAction(data));
  } catch (error) {
    yield put(loadOrdreMissionErrorAction(error));
  }
}

export function* deleteOrdreMission({ id }) {
  try {
    const { data } = yield call(
      request.delete,
      `${webService.DELETE_ORDRE_MISSION}?Id=${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    yield put(deleteOrdreMissionSuccessAction(data));
  } catch (error) {
    yield put(deleteOrdreMissionErrorAction(error));
  }
}

export default function* ordreMissionSaga() {
  yield takeLatest(LOAD_ORDRE_MISSIONS, loadOrdreMission);
  yield takeLatest(DELETE_ORDRE_MISSION, deleteOrdreMission);
}
