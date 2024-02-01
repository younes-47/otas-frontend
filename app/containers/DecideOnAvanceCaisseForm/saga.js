import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  DECIDE_ON_AVANCE_CAISSE,
  LOAD_AVANCE_CAISSE_DETAILS,
  webService,
} from './constants';
import {
  decideOnAvanceCaisseErrorAction,
  decideOnAvanceCaisseSuccessAction,
  loadAvanceCaisseDetailsErrorAction,
  loadAvanceCaisseDetailsSuccessAction,
} from './actions';

export function* loadAvanceCaisseDetailsSaga({ id }) {
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

export function* decideOnAvanceCaisseSaga({ data }) {
  try {
    yield call(request.put, webService.DECIDE_ON_AVANCE_CAISSE, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(decideOnAvanceCaisseSuccessAction());
  } catch (error) {
    yield put(decideOnAvanceCaisseErrorAction(error));
  }
}

// Individual exports for testing
export default function* decideOnAvanceCaisseFormSaga() {
  yield takeLatest(LOAD_AVANCE_CAISSE_DETAILS, loadAvanceCaisseDetailsSaga);
  yield takeLatest(DECIDE_ON_AVANCE_CAISSE, decideOnAvanceCaisseSaga);
}
