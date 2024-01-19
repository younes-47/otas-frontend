import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { ADD_ORDRE_MISSION, webService } from './constants';
import {
  AddOrdreMissionErrorAction,
  AddOrdreMissionSuccessAction,
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
    yield put(AddOrdreMissionSuccessAction(data)); // data is ID
  } catch (error) {
    yield put(AddOrdreMissionErrorAction(error));
  }
}

export default function* ordreMissionFormSaga() {
  yield takeLatest(ADD_ORDRE_MISSION, AddOrdreMission);
}
