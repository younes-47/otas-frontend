import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import {
  DOWNLOAD_DEPENSE_CAISSE_RECEIPTS,
  LOAD_DEPENSE_CAISSES,
  webService,
} from './constants';
import {
  downloadDepenseCaisseReceiptsFileErrorAction,
  downloadDepenseCaisseReceiptsFileSuccessAction,
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

export function* DownloadDepenseCaisseReceiptsFile({ fileName }) {
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
    yield put(downloadDepenseCaisseReceiptsFileSuccessAction(data));
  } catch (error) {
    yield put(downloadDepenseCaisseReceiptsFileErrorAction(error));
  }
}

export default function* decideOnDepenseCaisseTableSaga() {
  yield takeLatest(LOAD_DEPENSE_CAISSES, loadDepenseCaisse);
  yield takeLatest(
    DOWNLOAD_DEPENSE_CAISSE_RECEIPTS,
    DownloadDepenseCaisseReceiptsFile,
  );
}
