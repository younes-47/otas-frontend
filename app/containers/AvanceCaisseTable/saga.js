import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  loadAvanceCaisseSuccessAction,
  loadAvanceCaisseErrorAction,
  deleteAvanceCaisseSuccessAction,
  deleteAvanceCaisseErrorAction,
} from './actions';
import {
  DELETE_AVANCE_CAISSE,
  LOAD_AVANCE_CAISSES,
  webService,
} from './constants';

// Individual exports for testing
export function* loadAvanceCaisse() {
  try {
    const { data } = yield call(
      request.get,
      `${webService.LOAD_AVANCE_CAISSES}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    yield put(loadAvanceCaisseSuccessAction(data));
  } catch (error) {
    yield put(loadAvanceCaisseErrorAction(error));
  }
}

export function* deleteAvanceCaisse({ id }) {
  try {
    const { data } = yield call(
      request.delete,
      `${webService.DELETE_AVANCE_CAISSE}?Id=${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    yield put(deleteAvanceCaisseSuccessAction(data));
  } catch (error) {
    yield put(deleteAvanceCaisseErrorAction(error));
  }
}

export default function* avanceCaisseSaga() {
  yield takeLatest(LOAD_AVANCE_CAISSES, loadAvanceCaisse);
  yield takeLatest(DELETE_AVANCE_CAISSE, deleteAvanceCaisse);
}
