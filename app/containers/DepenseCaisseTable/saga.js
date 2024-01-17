import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  loadDepenseCaisseSuccessAction,
  loadDepenseCaisseErrorAction,
  deleteDepenseCaisseSuccessAction,
  deleteDepenseCaisseErrorAction,
} from './actions';
import {
  DELETE_DEPENSE_CAISSE,
  LOAD_DEPENSE_CAISSES,
  webService,
} from './constants';

// Individual exports for testing

export function* loadDepenseCaisse() {
  try {
    const { data } = yield call(
      request.get,
      `${webService.LOAD_DEPENSE_CAISSES}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    yield put(loadDepenseCaisseSuccessAction(data));
  } catch (error) {
    yield put(loadDepenseCaisseErrorAction(error));
  }
}

export function* deleteOrdreMission({ id }) {
  try {
    const { data } = yield call(
      request.delete,
      `${webService.DELETE_DEPENSE_CAISSE}?Id=${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    yield put(deleteDepenseCaisseSuccessAction(data));
  } catch (error) {
    yield put(deleteDepenseCaisseErrorAction(error));
  }
}

export default function* depenseCaisseSaga() {
  yield takeLatest(LOAD_DEPENSE_CAISSES, loadDepenseCaisse);
  yield takeLatest(DELETE_DEPENSE_CAISSE, deleteOrdreMission);
}
