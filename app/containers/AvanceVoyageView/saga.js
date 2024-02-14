import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  loadAvanceVoyageSuccessAction,
  loadAvanceVoyageErrorAction,
  downloadAvanceVoyageDocumentFileSuccessAction,
  downloadAvanceVoyageDocumentFileErrorAction,
} from './actions';
import {
  DOWNLOAD_AVANCE_VOYAGE_DOCUMENT,
  LOAD_AVANCE_VOYAGE,
  webService,
} from './constants';

// Individual exports for testing
export function* loadAvanceVoyage({ id }) {
  try {
    const { data } = yield call(
      request.get,
      `${webService.LOAD_AVANCE_VOYAGE}?Id=${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    yield put(loadAvanceVoyageSuccessAction(data));
  } catch (error) {
    yield put(loadAvanceVoyageErrorAction(error));
  }
}

export function* DownloadAvanceVoyageDocumentFile({ id }) {
  try {
    const { data } = yield call(
      request.get,
      `${webService.DOWNLOAD_AVANCE_VOYAGE_DOCUMENT}?Id=${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    yield put(downloadAvanceVoyageDocumentFileSuccessAction(data));
  } catch (error) {
    yield put(downloadAvanceVoyageDocumentFileErrorAction(error));
  }
}

// Individual exports for testing
export default function* avanceVoyageViewSaga() {
  yield takeLatest(LOAD_AVANCE_VOYAGE, loadAvanceVoyage);
  yield takeLatest(
    DOWNLOAD_AVANCE_VOYAGE_DOCUMENT,
    DownloadAvanceVoyageDocumentFile,
  );
}
