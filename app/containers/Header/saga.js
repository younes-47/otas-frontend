import { call, put, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';
import { CHANGE_PREFERRED_LANGUAGE, WebService } from './constants';
import {
  changePreferredLanguageErrorAction,
  changePreferredLanguageSuccessAction,
} from './actions';

export function* changePreferredLanguage({ preferredLanguage }) {
  try {
    const { data } = yield call(
      request.post,
      WebService.POST_PREFERED_LANGUAGE + preferredLanguage,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    yield put(changePreferredLanguageSuccessAction(data)); // success action
  } catch (error) {
    yield put(changePreferredLanguageErrorAction(error)); // error action
  }
}
// Individual exports for testing
export default function* settingsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(CHANGE_PREFERRED_LANGUAGE, changePreferredLanguage);
}
