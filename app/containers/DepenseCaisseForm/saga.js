import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { loadDepenseCaisseDetailsAction } from 'pages/DepenseCaisse/actions';
import {
  ADD_DEPENSE_CAISSE,
  LOAD_STATIC_DATA,
  SUBMIT_DEPENSE_CAISSE,
  UPDATE_DEPENSE_CAISSE,
  webService,
} from './constants';
import {
  AddDepenseCaisseErrorAction,
  AddDepenseCaisseSuccessAction,
  LoadStaticDataErrorAction,
  LoadStaticDataSuccessAction,
  UpdateDepenseCaisseErrorAction,
  UpdateDepenseCaisseSuccessAction,
  submitDepenseCaisseErrorAction,
  submitDepenseCaisseSuccessAction,
} from './actions';

export function* LoadStaticData() {
  try {
    const { data } = yield call(request.get, webService.LOAD_STATIC_DATA, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(LoadStaticDataSuccessAction(data));
  } catch (error) {
    yield put(LoadStaticDataErrorAction(error));
  }
}

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

export function* UpdateDepenseCaisse({ form }) {
  try {
    const { data } = yield call(
      request.put,
      webService.UPDATE_DEPENSE_CAISSE,
      form,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    yield put(UpdateDepenseCaisseSuccessAction());
    yield put(loadDepenseCaisseDetailsAction(data)); // data is ID
  } catch (error) {
    yield put(UpdateDepenseCaisseErrorAction(error));
  }
}

export function* SubmitDepenseCaisse({ id }) {
  try {
    yield call(request.put, `${webService.SUBMIT_DEPENSE_CAISSE}?Id=${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(submitDepenseCaisseSuccessAction());
  } catch (error) {
    yield put(submitDepenseCaisseErrorAction(error));
  }
}
// Individual exports for testing
export default function* depenseCaisseFormSaga() {
  yield takeLatest(ADD_DEPENSE_CAISSE, AddDepenseCaisse);
  yield takeLatest(SUBMIT_DEPENSE_CAISSE, SubmitDepenseCaisse);
  yield takeLatest(UPDATE_DEPENSE_CAISSE, UpdateDepenseCaisse);
  yield takeLatest(LOAD_STATIC_DATA, LoadStaticData);
}
