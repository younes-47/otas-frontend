import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { loadAvanceCaisseDetailsAction } from 'pages/AvanceCaisse/actions';
import {
  ADD_AVANCE_CAISSE,
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
    yield put(UpdateAvanceCaisseSuccessAction());
    yield put(loadAvanceCaisseDetailsAction(data)); // data is ID
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

// Individual exports for testing
export default function* avanceCaisseFormSaga() {
  yield takeLatest(LOAD_STATIC_DATA, LoadStaticData);
  yield takeLatest(ADD_AVANCE_CAISSE, AddAvanceCaisse);
  yield takeLatest(UPDATE_AVANCE_CAISSE, UpdateAvanceCaisse);
  yield takeLatest(SUBMIT_AVANCE_CAISSE, SubmitAvanceCaisse);
}
