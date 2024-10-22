import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { setOrdreMissionIdentityAction } from 'pages/OrdreMission/actions';
import {
  ADD_ORDRE_MISSION,
  DOWNLOAD_ORDRE_MISSION_DOCUMENT,
  LOAD_ORDRE_MISSION_DETAILS,
  LOAD_STATIC_DATA,
  SUBMIT_ORDRE_MISSION,
  UPDATE_ORDRE_MISSION,
  webService,
} from './constants';
import {
  AddOrdreMissionErrorAction,
  AddOrdreMissionSuccessAction,
  LoadStaticDataErrorAction,
  LoadStaticDataSuccessAction,
  UpdateOrdreMissionErrorAction,
  UpdateOrdreMissionSuccessAction,
  downloadOrdreMissionDocumentFileErrorAction,
  downloadOrdreMissionDocumentFileSuccessAction,
  loadOrdreMissionDetailsAction,
  loadOrdreMissionDetailsErrorAction,
  loadOrdreMissionDetailsSuccessAction,
  submitOrdreMissionErrorAction,
  submitOrdreMissionSuccessAction,
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
export function* AddOrdreMission({ form }) {
  try {
    const { data } = yield call(
      request.post,
      webService.ADD_ORDRE_MISSION,
      form,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    yield put(setOrdreMissionIdentityAction(data)); // data is ID
    yield put(AddOrdreMissionSuccessAction());
  } catch (error) {
    yield put(AddOrdreMissionErrorAction(error));
  }
}

export function* UpdateOrdreMission({ form }) {
  try {
    const { data } = yield call(
      request.put,
      webService.UPDATE_ORDRE_MISSION,
      form,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    yield put(setOrdreMissionIdentityAction(data)); // data is ID
    yield put(UpdateOrdreMissionSuccessAction());
  } catch (error) {
    yield put(UpdateOrdreMissionErrorAction(error));
  }
}

export function* SubmitOrdreMission({ id }) {
  try {
    yield call(request.put, `${webService.SUBMIT_ORDRE_MISSION}?Id=${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(submitOrdreMissionSuccessAction());
  } catch (error) {
    yield put(submitOrdreMissionErrorAction(error));
  }
}

export function* loadOrdreMissionDetailsSaga({ id }) {
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
    yield put(loadOrdreMissionDetailsSuccessAction(data));
  } catch (error) {
    yield put(loadOrdreMissionDetailsErrorAction(error));
  }
}

export function* DownloadOrdreMissionDocumentFile({ id }) {
  try {
    const { data } = yield call(
      request.get,
      `${webService.DOWNLOAD_ORDRE_MISSION_DOCUMENT}?Id=${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    yield put(downloadOrdreMissionDocumentFileSuccessAction(data));
  } catch (error) {
    yield put(downloadOrdreMissionDocumentFileErrorAction(error));
  }
}

export default function* ordreMissionFormSaga() {
  yield takeLatest(LOAD_STATIC_DATA, LoadStaticData);
  yield takeLatest(ADD_ORDRE_MISSION, AddOrdreMission);
  yield takeLatest(UPDATE_ORDRE_MISSION, UpdateOrdreMission);
  yield takeLatest(SUBMIT_ORDRE_MISSION, SubmitOrdreMission);
  yield takeLatest(LOAD_ORDRE_MISSION_DETAILS, loadOrdreMissionDetailsSaga);
  yield takeLatest(
    DOWNLOAD_ORDRE_MISSION_DOCUMENT,
    DownloadOrdreMissionDocumentFile,
  );
}
