import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  CONFIRM_FUNDS_DELIVERY,
  DECIDE_ON_AVANCE_CAISSE,
  LOAD_AVANCE_CAISSE_DETAILS,
  MARK_FUNDS_AS_PREPARED,
  webService,
} from './constants';
import {
  confirmAvanceCaisseFundsDeliveryErrorAction,
  confirmAvanceCaisseFundsDeliverySuccessAction,
  decideOnAvanceCaisseErrorAction,
  decideOnAvanceCaisseSuccessAction,
  loadAvanceCaisseDetailsErrorAction,
  loadAvanceCaisseDetailsSuccessAction,
  markAvanceCaisseFundsAsPreparedErrorAction,
  markAvanceCaisseFundsAsPreparedSuccessAction,
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

export function* markAvanceCaisseFundsAsPrepared({ data }) {
  try {
    yield call(request.put, webService.MARK_FUNDS_AS_PREPARED, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(markAvanceCaisseFundsAsPreparedSuccessAction());
  } catch (error) {
    yield put(markAvanceCaisseFundsAsPreparedErrorAction(error));
  }
}

export function* confirmAvanceCaisseFundsDelivery({ data }) {
  try {
    yield call(request.put, webService.CONFIRM_FUNDS_DELIVERY, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(confirmAvanceCaisseFundsDeliverySuccessAction());
  } catch (error) {
    yield put(confirmAvanceCaisseFundsDeliveryErrorAction(error));
  }
}
// Individual exports for testing
export default function* decideOnAvanceCaisseFormSaga() {
  yield takeLatest(LOAD_AVANCE_CAISSE_DETAILS, loadAvanceCaisseDetailsSaga);
  yield takeLatest(DECIDE_ON_AVANCE_CAISSE, decideOnAvanceCaisseSaga);
  yield takeLatest(MARK_FUNDS_AS_PREPARED, markAvanceCaisseFundsAsPrepared);
  yield takeLatest(CONFIRM_FUNDS_DELIVERY, confirmAvanceCaisseFundsDelivery);
}
