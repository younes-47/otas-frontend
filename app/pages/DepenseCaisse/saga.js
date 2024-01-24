// import { take, call, put, select, takeLatest } from 'redux-saga/effects';
// import request from 'utils/request';
// import {
//   loadDepenseCaisseDetailsSuccessAction,
//   loadDepenseCaisseDetailsErrorAction,
// } from './actions';
// import { LOAD_DEPENSE_CAISSE_DETAILS, webService } from './constants';

// // Individual exports for testing

// export function* loadDepenseCaisseDetails({ id }) {
//   try {
//     const { data } = yield call(
//       request.get,
//       `${webService.LOAD_DEPENSE_CAISSE_DETAILS}?Id=${id}`,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       },
//     );
//     yield put(loadDepenseCaisseDetailsSuccessAction(data));
//   } catch (error) {
//     yield put(loadDepenseCaisseDetailsErrorAction(error));
//   }
// }

// export default function* depenseCaisseSaga() {
//   yield takeLatest(LOAD_DEPENSE_CAISSE_DETAILS, loadDepenseCaisseDetails);
// }
