import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { ADD_DEPENSE_CAISSE, webService } from './constants';
import {
  AddDepenseCaisseErrorAction,
  AddDepenseCaisseSuccessAction,
} from './actions';

export function* AddDepenseCaisse({ data }) {
  try {
    yield call(request.post, webService.ADD_DEPENSE_CAISSE, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(AddDepenseCaisseSuccessAction());
  } catch (error) {
    yield put(AddDepenseCaisseErrorAction(error));
  }
}
// Individual exports for testing
export default function* depenseCaisseFormSaga() {
  yield takeLatest(ADD_DEPENSE_CAISSE, AddDepenseCaisse);
}
