import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { setDepenseCaisseIdentityAction } from 'pages/DepenseCaisse/actions';
import {
  ADD_DEPENSE_CAISSE,
  LOAD_DEPENSE_CAISSE_DETAILS,
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
  loadDepenseCaisseDetailsErrorAction,
  loadDepenseCaisseDetailsSuccessAction,
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

export function* AddDepenseCaisse({ form }) {
  try {
    const { data } = yield call(
      request.post,
      webService.ADD_DEPENSE_CAISSE,
      form,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    yield put(AddDepenseCaisseSuccessAction());
    yield put(setDepenseCaisseIdentityAction(data)); // data is ID
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
    yield put(setDepenseCaisseIdentityAction(data)); // data is ID
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

export function* loadDepenseCaisseDetails({ id }) {
  try {
    const { data } = yield call(
      request.get,
      `${webService.LOAD_DEPENSE_CAISSE_DETAILS}?Id=${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    yield put(loadDepenseCaisseDetailsSuccessAction(data));
  } catch (error) {
    yield put(loadDepenseCaisseDetailsErrorAction(error));
  }
}

// Individual exports for testing
export default function* depenseCaisseFormSaga() {
  yield takeLatest(ADD_DEPENSE_CAISSE, AddDepenseCaisse);
  yield takeLatest(SUBMIT_DEPENSE_CAISSE, SubmitDepenseCaisse);
  yield takeLatest(UPDATE_DEPENSE_CAISSE, UpdateDepenseCaisse);
  yield takeLatest(LOAD_STATIC_DATA, LoadStaticData);
  yield takeLatest(LOAD_DEPENSE_CAISSE_DETAILS, loadDepenseCaisseDetails);
}
