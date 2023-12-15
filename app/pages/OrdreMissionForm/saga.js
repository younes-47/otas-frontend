import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { ADD_ORDRE_MISSION, webService } from './constants';
import {
  AddOrdreMissionErrorAction,
  AddOrdreMissionSuccessAction,
  AddOrdreMissionAction,
} from './actions';

export function* AddOrdreMission({ data }) {
  try {
    yield call(request.post, webService.ADD_ORDRE_MISSION, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(AddOrdreMissionSuccessAction());
  } catch (error) {
    yield put(AddOrdreMissionErrorAction(error));
  }
}

export default function* ordreMissionFormSaga() {
  yield takeLatest(ADD_ORDRE_MISSION, AddOrdreMission);
}
