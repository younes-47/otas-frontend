/*
 *
 * AvanceVoyage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, LOAD_AVANCE_VOYAGES, LOAD_AVANCE_VOYAGES_ERROR, LOAD_AVANCE_VOYAGES_SUCCESS } from './constants';

export const initialState = {
  loadingAvanceVoyages: false,
  errorLoadingAvanceVoyages: null,
  avanceVoyages: [],
};

/* eslint-disable default-case, no-param-reassign */
const avanceVoyageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_AVANCE_VOYAGES:
        draft.loadingAvanceVoyages = true
        draft.errorLoadingAvanceVoyages = false
        break;
      case LOAD_AVANCE_VOYAGES_ERROR:
        draft.loadingAvanceVoyages = false
        draft.errorLoadingAvanceVoyages = action.error
        break;
      case LOAD_AVANCE_VOYAGES_SUCCESS:
        draft.loadingAvanceVoyages = false
        draft.errorLoadingAvanceVoyages = false
        draft.avanceVoyages = action.data
        break;
    }
  });

export default avanceVoyageReducer;
