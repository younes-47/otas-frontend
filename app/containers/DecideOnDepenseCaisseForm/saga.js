import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  DECIDE_ON_DEPENSE_CAISSE,
  LOAD_DEPENSE_CAISSE_DETAILS,
  webService,
} from './constants';
import {
  decideOnDepenseCaisseErrorAction,
  decideOnDepenseCaisseSuccessAction,
  loadDepenseCaisseDetailsErrorAction,
  loadDepenseCaisseDetailsSuccessAction,
} from './actions';

export function* loadDepenseCaisseDetailsSaga({ id }) {
  try {
    const { data } = yield call(
      request.get,
      `${webService.LOAD_DEPENSE_CAISSE_DETAILS}?Id=${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    yield put(loadDepenseCaisseDetailsSuccessAction(data));
  } catch (error) {
    yield put(loadDepenseCaisseDetailsErrorAction(error));
  }
}

export function* decideOnDepenseCaisseSaga({ data }) {
  try {
    yield call(request.put, webService.DECIDE_ON_DEPENSE_CAISSE, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(decideOnDepenseCaisseSuccessAction());
  } catch (error) {
    yield put(decideOnDepenseCaisseErrorAction(error));
  }
}

// Individual exports for testing
export default function* decideOnDepenseCaisseFormSaga() {
  yield takeLatest(LOAD_DEPENSE_CAISSE_DETAILS, loadDepenseCaisseDetailsSaga);
  yield takeLatest(DECIDE_ON_DEPENSE_CAISSE, decideOnDepenseCaisseSaga);
}
