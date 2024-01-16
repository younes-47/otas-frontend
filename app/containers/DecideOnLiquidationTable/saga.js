import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  loadLiquidationErrorAction,
  loadLiquidationSuccessAction,
} from './actions';
import { LOAD_LIQUIDATIONS, webService } from './constants';

// Individual exports for testing
export function* loadLiquidations() {
  try {
    const { data } = yield call(
      request.get,
      `${webService.LOAD_LIQUIDATIONS}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    yield put(loadLiquidationSuccessAction(data));
  } catch (error) {
    yield put(loadLiquidationErrorAction(error));
  }
}

// Individual exports for testing
export default function* decideOnLiquidationTableSaga() {
  yield takeLatest(LOAD_LIQUIDATIONS, loadLiquidations);
}
