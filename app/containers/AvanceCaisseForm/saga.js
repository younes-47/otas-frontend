import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { ADD_AVANCE_CAISSE, webService } from './constants';
import {
  AddAvanceCaisseErrorAction,
  AddAvanceCaisseSuccessAction,
} from './actions';

export function* AddAvanceCaisse({ data }) {
  try {
    yield call(request.post, webService.ADD_AVANCE_CAISSE, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(AddAvanceCaisseSuccessAction());
  } catch (error) {
    yield put(AddAvanceCaisseErrorAction(error));
  }
}

// Individual exports for testing
export default function* avanceCaisseFormSaga() {
  yield takeLatest(ADD_AVANCE_CAISSE, AddAvanceCaisse);
}
