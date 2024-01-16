import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  loadAvanceCaisseSuccessAction,
  loadAvanceCaisseErrorAction,
} from './actions';
import { LOAD_AVANCE_CAISSES, webService } from './constants';

// Individual exports for testing
export function* loadAvanceCaisseDecideOnTable() {
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

export default function* decideOnAvanceCaisseTableSaga() {
  yield takeLatest(LOAD_AVANCE_CAISSES, loadAvanceCaisseDecideOnTable);
}
