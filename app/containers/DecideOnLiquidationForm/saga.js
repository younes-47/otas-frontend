import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  DECIDE_ON_LIQUIDATION,
  LOAD_LIQUIDATION_DETAILS,
  webService,
} from './constants';
import {
  decideOnLiquidationErrorAction,
  decideOnLiquidationSuccessAction,
  loadLiquidationDetailsErrorAction,
  loadLiquidationDetailsSuccessAction,
} from './actions';

export function* loadLiquidationDetailsSaga({ id }) {
  try {
    const { data } = yield call(
      request.get,
      `${webService.LOAD_LIQUIDATION_DETAILS}?Id=${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    yield put(loadLiquidationDetailsSuccessAction(data));
  } catch (error) {
    yield put(loadLiquidationDetailsErrorAction(error));
  }
}

export function* decideOnLiquidationSaga({ data }) {
  try {
    yield call(request.put, webService.DECIDE_ON_LIQUIDATION, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(decideOnLiquidationSuccessAction());
  } catch (error) {
    yield put(decideOnLiquidationErrorAction(error));
  }
}

// Individual exports for testing
export default function* decideOnLiquidationFormSaga() {
  yield takeLatest(LOAD_LIQUIDATION_DETAILS, loadLiquidationDetailsSaga);
  yield takeLatest(DECIDE_ON_LIQUIDATION, decideOnLiquidationSaga);
}
