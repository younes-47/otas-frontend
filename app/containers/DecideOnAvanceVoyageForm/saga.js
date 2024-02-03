import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  CONFIRM_FUNDS_DELIVERY,
  DECIDE_ON_AVANCE_VOYAGE,
  LOAD_AVANCE_VOYAGE_DETAILS,
  MARK_FUNDS_AS_PREPARED,
  webService,
} from './constants';
import {
  confirmAvanceVoyageFundsDeliveryErrorAction,
  confirmAvanceVoyageFundsDeliverySuccessAction,
  decideOnAvanceVoyageErrorAction,
  decideOnAvanceVoyageSuccessAction,
  loadAvanceVoyageDetailsErrorAction,
  loadAvanceVoyageDetailsSuccessAction,
  markAvanceVoyageFundsAsPreparedErrorAction,
  markAvanceVoyageFundsAsPreparedSuccessAction,
} from './actions';

export function* loadAvanceVoyageDetailsSaga({ id }) {
  try {
    const { data } = yield call(
      request.get,
      `${webService.LOAD_AVANCE_VOYAGE_DETAILS}?Id=${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    yield put(loadAvanceVoyageDetailsSuccessAction(data));
  } catch (error) {
    yield put(loadAvanceVoyageDetailsErrorAction(error));
  }
}

export function* decideOnAvanceVoyageSaga({ data }) {
  try {
    yield call(request.put, webService.DECIDE_ON_AVANCE_VOYAGE, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(decideOnAvanceVoyageSuccessAction());
  } catch (error) {
    yield put(decideOnAvanceVoyageErrorAction(error));
  }
}

export function* markAvanceVoyageFundsAsPrepared({ data }) {
  try {
    yield call(request.put, webService.MARK_FUNDS_AS_PREPARED, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(markAvanceVoyageFundsAsPreparedSuccessAction());
  } catch (error) {
    yield put(markAvanceVoyageFundsAsPreparedErrorAction(error));
  }
}

export function* confirmAvanceVoyageFundsDelivery({ data }) {
  try {
    yield call(request.put, webService.CONFIRM_FUNDS_DELIVERY, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(confirmAvanceVoyageFundsDeliverySuccessAction());
  } catch (error) {
    yield put(confirmAvanceVoyageFundsDeliveryErrorAction(error));
  }
}

// Individual exports for testing
export default function* decideOnAvanceVoyageFormSaga() {
  yield takeLatest(LOAD_AVANCE_VOYAGE_DETAILS, loadAvanceVoyageDetailsSaga);
  yield takeLatest(DECIDE_ON_AVANCE_VOYAGE, decideOnAvanceVoyageSaga);
  yield takeLatest(MARK_FUNDS_AS_PREPARED, markAvanceVoyageFundsAsPrepared);
  yield takeLatest(CONFIRM_FUNDS_DELIVERY, confirmAvanceVoyageFundsDelivery);
}
