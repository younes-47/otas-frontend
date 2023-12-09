import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { loadDepenseCaisseSuccessAction, loadDepenseCaisseErrorAction } from './actions';
import { LOAD_DEPENSE_CAISSES, webService } from './constants';

// Individual exports for testing

export function* loadDepenseCaisse() {
  try {
    const { data } = yield call(
      request.get,
      webService.LOAD_DEPENSE_CAISSES + "?userId=4",
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    yield put(loadDepenseCaisseSuccessAction(data))
  }
  catch (error) {
    yield put(loadDepenseCaisseErrorAction(error))
  }
}



export default function* depenseCaisseSaga() {
  yield takeLatest(LOAD_DEPENSE_CAISSES, loadDepenseCaisse)
}
