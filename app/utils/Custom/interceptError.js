import { setErrorAction } from 'containers/Header/actions';
import React from 'react';
import { store } from 'app';

export default function interceptError(error) {
  store.dispatch(setErrorAction(error));
}
