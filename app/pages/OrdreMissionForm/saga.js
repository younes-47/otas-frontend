import { call, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { ADD_ORDRE_MISSION, webService } from './constants';

export function* AddOrdreMission(data) {
  try {
    yield call(request.post, webService.ADD_ORDRE_MISSION, {
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });
  } catch (error) {
    console.log(error);
  }
}

export default function* ordreMissionFormSaga() {
  yield takeLatest(ADD_ORDRE_MISSION, AddOrdreMission);
}
