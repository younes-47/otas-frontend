import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { loginUserErrorAction, loginUserSuccessAction } from './actions';
import { LOGIN_USER, WebService } from './constants';

export function* loginUser({ username, password }) {
  try {
    const { data } = yield call(
      request.post,
      WebService.AUTH_REQUEST,
      { name: username, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    yield put(loginUserSuccessAction(data)); // success action
  } catch (error) {
    yield put(loginUserErrorAction(error)); // error action
  }
}

export default function* loginPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOGIN_USER, loginUser);
}
