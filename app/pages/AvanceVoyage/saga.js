// import { take, call, put, select, takeLatest } from 'redux-saga/effects';
// import request from 'utils/request';
// import {
//   loadAvanceVoyageSuccessAction,
//   loadAvanceVoyageErrorAction,
// } from './actions';
// import { LOAD_AVANCE_VOYAGES, webService } from './constants';

// // Individual exports for testing
// export function* loadAvanceVoyages() {
//   try {
//     const { data } = yield call(
//       request.get,
//       `${webService.LOAD_AVANCE_VOYAGE}?userId=4`,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       },
//     );
//     yield put(loadAvanceVoyageSuccessAction(data));
//   } catch (error) {
//     yield put(loadAvanceVoyageErrorAction(error));
//   }
// }

// export default function* AvanceVoyageSaga() {
//   yield takeLatest(LOAD_AVANCE_VOYAGES, loadAvanceVoyages);
// }
