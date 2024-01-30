import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  DECIDE_ON_AVANCE_VOYAGE,
  LOAD_AVANCE_VOYAGE_DETAILS,
  webService,
} from './constants';
import {
  decideOnAvanceVoyageErrorAction,
  decideOnAvanceVoyageSuccessAction,
  loadAvanceVoyageDetailsErrorAction,
  loadAvanceVoyageDetailsSuccessAction,
} from './actions';

export function* loadAvanceVoyageDetailsSaga({ id }) {
  try {
    const { data } = yield call(
      request.get,
      `${webService.LOAD_ORDRE_MISSION_DETAILS}?Id=${id}`,
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
    yield call(request.put, webService.DECIDE_ON_ORDRE_MISSION, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(decideOnAvanceVoyageSuccessAction());
  } catch (error) {
    yield put(decideOnAvanceVoyageErrorAction(error));
  }
}

// Individual exports for testing
export default function* decideOnAvanceVoyageFormSaga() {
  yield takeLatest(LOAD_AVANCE_VOYAGE_DETAILS, loadAvanceVoyageDetailsSaga);
  yield takeLatest(DECIDE_ON_AVANCE_VOYAGE, decideOnAvanceVoyageSaga);
}
