import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { setLiquidationIdentityAction } from 'pages/Liquidation/actions';
import {
  ADD_LIQUIDATION,
  LOAD_LIQUIDATION_DETAILS,
  LOAD_REQUESTS_TO_LIQUIDATE,
  LOAD_REQUEST_TO_LIQUIDATE_DETAILS,
  SUBMIT_LIQUIDATION,
  UPDATE_LIQUIDATION,
  webService,
} from './constants';
import {
  AddLiquidationErrorAction,
  AddLiquidationSuccessAction,
  UpdateLiquidationErrorAction,
  UpdateLiquidationSuccessAction,
  loadLiquidationDetailsErrorAction,
  loadLiquidationDetailsSuccessAction,
  loadRequestToLiquidateDetailsErrorAction,
  loadRequestToLiquidateDetailsSuccessAction,
  loadRequestsToLiquidateErrorAction,
  loadRequestsToLiquidateSuccessAction,
  submitLiquidationErrorAction,
  submitLiquidationSuccessAction,
} from './actions';

export function* AddLiquidation({ form }) {
  try {
    const { data } = yield call(
      request.post,
      webService.ADD_LIQUIDATION,
      form,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    yield put(setLiquidationIdentityAction(data)); // data is ID
    yield put(AddLiquidationSuccessAction());
  } catch (error) {
    yield put(AddLiquidationErrorAction(error));
  }
}

export function* UpdateLiquidation({ form }) {
  try {
    const { data } = yield call(
      request.put,
      webService.UPDATE_LIQUIDATION,
      form,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    yield put(setLiquidationIdentityAction(data)); // data is ID
    yield put(UpdateLiquidationSuccessAction());
  } catch (error) {
    yield put(UpdateLiquidationErrorAction(error));
  }
}

export function* SubmitLiquidation({ id }) {
  try {
    yield call(request.put, `${webService.SUBMIT_LIQUIDATION}?Id=${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(submitLiquidationSuccessAction());
  } catch (error) {
    yield put(submitLiquidationErrorAction(error));
  }
}

export function* loadLiquidationDetails({ id }) {
  try {
    const { data } = yield call(
      request.get,
      `${webService.LOAD_LIQUIDATION_DETAILS}?Id=${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    yield put(loadLiquidationDetailsSuccessAction(data));
  } catch (error) {
    yield put(loadLiquidationDetailsErrorAction(error));
  }
}

export function* loadRequestsToLiquidate({ requestType }) {
  try {
    const { data } = yield call(
      request.get,
      `${webService.LOAD_REQUESTS_TO_LIQUIDATE}?requestType=${requestType}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    yield put(loadRequestsToLiquidateSuccessAction(data));
  } catch (error) {
    yield put(loadRequestsToLiquidateErrorAction(error));
  }
}

export function* loadRequestToLiquidateDetails({ id, requestType }) {
  if (requestType === 'AV') {
    try {
      const { data } = yield call(
        request.get,
        `Liquidation/Requests/ToLiquidate/AvanceVoyage?requestId=${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      yield put(loadRequestToLiquidateDetailsSuccessAction(data));
    } catch (error) {
      yield put(loadRequestToLiquidateDetailsErrorAction(error));
    }
  } else {
    try {
      const { data } = yield call(
        request.get,
        `Liquidation/Requests/ToLiquidate/AvanceCaisse?requestId=${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      yield put(loadRequestToLiquidateDetailsSuccessAction(data));
    } catch (error) {
      yield put(loadRequestToLiquidateDetailsErrorAction(error));
    }
  }
}

// Individual exports for testing
export default function* liquidationFormSaga() {
  yield takeLatest(ADD_LIQUIDATION, AddLiquidation);
  yield takeLatest(SUBMIT_LIQUIDATION, SubmitLiquidation);
  yield takeLatest(UPDATE_LIQUIDATION, UpdateLiquidation);
  yield takeLatest(LOAD_LIQUIDATION_DETAILS, loadLiquidationDetails);
  yield takeLatest(LOAD_REQUESTS_TO_LIQUIDATE, loadRequestsToLiquidate);
  yield takeLatest(
    LOAD_REQUEST_TO_LIQUIDATE_DETAILS,
    loadRequestToLiquidateDetails,
  );
}
