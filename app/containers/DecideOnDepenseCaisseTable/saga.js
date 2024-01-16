import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import { LOAD_DEPENSE_CAISSES, webService } from './constants';
import {
  loadDepenseCaisseErrorAction,
  loadDepenseCaisseSuccessAction,
} from './actions';

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

export default function* decideOnDepenseCaisseTableSaga() {
  yield takeLatest(LOAD_DEPENSE_CAISSES, loadDepenseCaisse);
}
