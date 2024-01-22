import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { loadOrdreMissionDetailsAction } from 'pages/OrdreMission/actions';
import {
  ADD_ORDRE_MISSION,
  UPDATE_ORDRE_MISSION,
  webService,
} from './constants';
import {
  AddOrdreMissionErrorAction,
  AddOrdreMissionSuccessAction,
  UpdateOrdreMissionErrorAction,
  UpdateOrdreMissionSuccessAction,
} from './actions';

export function* AddOrdreMission({ form }) {
  try {
    const { data } = yield call(
      request.post,
      webService.ADD_ORDRE_MISSION,
      form,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    yield put(AddOrdreMissionSuccessAction());
    yield put(loadOrdreMissionDetailsAction(data)); // data is ID
  } catch (error) {
    yield put(AddOrdreMissionErrorAction(error));
  }
}

export function* UpdateOrdreMission({ form }) {
  try {
    const { data } = yield call(
      request.put,
      webService.UPDATE_ORDRE_MISSION,
      form,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    yield put(UpdateOrdreMissionSuccessAction(data)); // data is ID
  } catch (error) {
    yield put(UpdateOrdreMissionErrorAction(error));
  }
}

export default function* ordreMissionFormSaga() {
  yield takeLatest(ADD_ORDRE_MISSION, AddOrdreMission);
  yield takeLatest(UPDATE_ORDRE_MISSION, UpdateOrdreMission);
}
