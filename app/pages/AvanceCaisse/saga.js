import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  loadAvanceCaisseDetailsSuccessAction,
  loadAvanceCaisseDetailsErrorAction,
} from './actions';
import { LOAD_AVANCE_CAISSE_DETAILS, webService } from './constants';

// Individual exports for testing
export function* loadAvanceCaisseDetails({ id }) {
  try {
    const { data } = yield call(
      request.get,
      `${webService.LOAD_AVANCE_CAISSE_DETAILS}?Id=${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    yield put(loadAvanceCaisseDetailsSuccessAction(data));
  } catch (error) {
    yield put(loadAvanceCaisseDetailsErrorAction(error));
  }
}

export default function* avanceCaisseSaga() {
  yield takeLatest(LOAD_AVANCE_CAISSE_DETAILS, loadAvanceCaisseDetails);
}
