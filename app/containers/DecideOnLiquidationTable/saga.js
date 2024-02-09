import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  downloadLiquidationReceiptsFileErrorAction,
  downloadLiquidationReceiptsFileSuccessAction,
  loadLiquidationErrorAction,
  loadLiquidationSuccessAction,
} from './actions';
import {
  DOWNLOAD_LIQUIDATION_RECEIPTS,
  LOAD_LIQUIDATIONS,
  webService,
} from './constants';

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

export function* DownloadLiquidationReceiptsFile({ fileName }) {
  try {
    const { data } = yield call(
      request.get,
      `${webService.DOWNLOAD_RECEIPTS}?fileName=${fileName}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    yield put(downloadLiquidationReceiptsFileSuccessAction(data));
  } catch (error) {
    yield put(downloadLiquidationReceiptsFileErrorAction(error));
  }
}

// Individual exports for testing
export default function* decideOnLiquidationTableSaga() {
  yield takeLatest(LOAD_LIQUIDATIONS, loadLiquidations);
  yield takeLatest(
    DOWNLOAD_LIQUIDATION_RECEIPTS,
    DownloadLiquidationReceiptsFile,
  );
}
