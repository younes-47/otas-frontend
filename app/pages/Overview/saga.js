// import { take, call, put, select } from 'redux-saga/effects';

import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_FULL_NAME, WebService } from './constants';
import { loadFullNameErrorAction, loadFullNameSuccessAction } from './actions';

// FullName
export function* loadFullName({ username }) {
  const token = localStorage.getItem('token');
  try {
    const { data } = yield call(
      request.get,
      WebService.GET_FULL_NAME + username,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    yield put(loadFullNameSuccessAction(data)); // success action
  } catch (error) {
    yield put(loadFullNameErrorAction(error)); // error action
  }
}
// Individual exports for testing
export default function* overviewSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOAD_FULL_NAME, loadFullName);
}
