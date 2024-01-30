import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { setAvanceCaisseIdentityAction } from 'pages/AvanceCaisse/actions';
import {
  ADD_AVANCE_CAISSE,
  LOAD_AVANCE_CAISSE_DETAILS,
  LOAD_STATIC_DATA,
  SUBMIT_AVANCE_CAISSE,
  UPDATE_AVANCE_CAISSE,
  webService,
} from './constants';
import {
  AddAvanceCaisseErrorAction,
  AddAvanceCaisseSuccessAction,
  LoadStaticDataErrorAction,
  LoadStaticDataSuccessAction,
  UpdateAvanceCaisseErrorAction,
  UpdateAvanceCaisseSuccessAction,
  loadAvanceCaisseDetailsAction,
  loadAvanceCaisseDetailsErrorAction,
  loadAvanceCaisseDetailsSuccessAction,
  submitAvanceCaisseErrorAction,
  submitAvanceCaisseSuccessAction,
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

export function* AddAvanceCaisse({ form }) {
  try {
    const { data } = yield call(
      request.post,
      webService.ADD_AVANCE_CAISSE,
      form,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    yield put(setAvanceCaisseIdentityAction(data)); // data is id
    yield put(AddAvanceCaisseSuccessAction());
  } catch (error) {
    yield put(AddAvanceCaisseErrorAction(error));
  }
}

export function* UpdateAvanceCaisse({ form }) {
  try {
    const { data } = yield call(
      request.put,
      webService.UPDATE_AVANCE_CAISSE,
      form,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    yield put(setAvanceCaisseIdentityAction(data)); // data is ID
    yield put(UpdateAvanceCaisseSuccessAction());
  } catch (error) {
    yield put(UpdateAvanceCaisseErrorAction(error));
  }
}

export function* SubmitAvanceCaisse({ id }) {
  try {
    yield call(request.put, `${webService.SUBMIT_AVANCE_CAISSE}?Id=${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(submitAvanceCaisseSuccessAction());
  } catch (error) {
    yield put(submitAvanceCaisseErrorAction(error));
  }
}

export function* loadAvanceCaisseDetails({ id }) {
  try {
    const { data } = yield call(
      request.get,
      `${webService.LOAD_AVANCE_CAISSE_DETAILS}?Id=${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    yield put(loadAvanceCaisseDetailsSuccessAction(data));
  } catch (error) {
    yield put(loadAvanceCaisseDetailsErrorAction(error));
  }
}

// Individual exports for testing
export default function* avanceCaisseFormSaga() {
  yield takeLatest(LOAD_STATIC_DATA, LoadStaticData);
  yield takeLatest(ADD_AVANCE_CAISSE, AddAvanceCaisse);
  yield takeLatest(UPDATE_AVANCE_CAISSE, UpdateAvanceCaisse);
  yield takeLatest(SUBMIT_AVANCE_CAISSE, SubmitAvanceCaisse);
  yield takeLatest(LOAD_AVANCE_CAISSE_DETAILS, loadAvanceCaisseDetails);
}
