/*
 *
 * AvanceCaisseForm reducer
 *
 */
import produce from 'immer';
import {
  ADD_AVANCE_CAISSE,
  ADD_AVANCE_CAISSE_ERROR,
  ADD_AVANCE_CAISSE_SUCCESS,
  CHANGE_ONBEHALF_SELECTION_ACTION,
  CLEANUP_STORE_ACTION,
  DEFAULT_ACTION,
  LOAD_AVANCE_CAISSE_DETAILS,
  LOAD_AVANCE_CAISSE_DETAILS_ERROR,
  LOAD_AVANCE_CAISSE_DETAILS_SUCCESS,
  LOAD_STATIC_DATA,
  LOAD_STATIC_DATA_ERROR,
  LOAD_STATIC_DATA_SUCCESS,
  SUBMIT_AVANCE_CAISSE,
  SUBMIT_AVANCE_CAISSE_ERROR,
  SUBMIT_AVANCE_CAISSE_SUCCESS,
  UPDATE_AVANCE_CAISSE,
  UPDATE_AVANCE_CAISSE_ERROR,
  UPDATE_AVANCE_CAISSE_SUCCESS,
} from './constants';

export const initialState = {
  onBehalfSelection: 'false',
  addingAvanceCaisse: false,
  errorAddingAvanceCaisse: null,
  loadingStaticData: false,
  errorLoadingStaticData: null,
  staticData: null,
  submittingAvanceCaisse: false,
  errorSubmittingAvanceCaisse: null,
  updatingAvanceCaisse: false,
  errorUpdatingAvanceCaisse: null,
  loadingaAvanceCaisseDetails: false,
  errorLoadingAvanceCaisseDetails: null,
  avanceCaisseDetails: null,
};

/* eslint-disable default-case, no-param-reassign */
const avanceCaisseFormReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_AVANCE_CAISSE_DETAILS:
        draft.loadingaAvanceCaisseDetails = true;
        draft.errorLoadingAvanceCaisseDetails = null;
        break;
      case LOAD_AVANCE_CAISSE_DETAILS_SUCCESS:
        draft.loadingaAvanceCaisseDetails = false;
        draft.errorLoadingAvanceCaisseDetails = false;
        draft.avanceCaisseDetails = action.data;
        break;
      case LOAD_AVANCE_CAISSE_DETAILS_ERROR:
        draft.loadingaAvanceCaisseDetails = false;
        draft.errorLoadingAvanceCaisseDetails = true;
        break;
      case LOAD_STATIC_DATA:
        draft.loadingStaticData = true;
        draft.errorLoadingStaticData = null;
        break;
      case LOAD_STATIC_DATA_SUCCESS:
        draft.loadingStaticData = false;
        draft.errorLoadingStaticData = false;
        draft.staticData = action.data;
        break;
      case LOAD_STATIC_DATA_ERROR:
        draft.loadingStaticData = false;
        draft.errorLoadingStaticData = true;
        break;
      case ADD_AVANCE_CAISSE:
        draft.addingAvanceCaisse = true;
        draft.errorAddingAvanceCaisse = null;
        break;
      case ADD_AVANCE_CAISSE_SUCCESS:
        draft.addingAvanceCaisse = false;
        draft.errorAddingAvanceCaisse = false;
        break;
      case ADD_AVANCE_CAISSE_ERROR:
        draft.addingAvanceCaisse = false;
        draft.errorAddingAvanceCaisse = true;
        break;
      case SUBMIT_AVANCE_CAISSE:
        draft.submittingAvanceCaisse = true;
        draft.errorSubmittingAvanceCaisse = null;
        break;
      case SUBMIT_AVANCE_CAISSE_SUCCESS:
        draft.submittingAvanceCaisse = false;
        draft.errorSubmittingAvanceCaisse = false;
        break;
      case SUBMIT_AVANCE_CAISSE_ERROR:
        draft.submittingAvanceCaisse = false;
        draft.errorSubmittingAvanceCaisse = true;
        break;
      case UPDATE_AVANCE_CAISSE:
        draft.updatingAvanceCaisse = true;
        draft.errorUpdatingAvanceCaisse = null;
        break;
      case UPDATE_AVANCE_CAISSE_SUCCESS:
        draft.updatingAvanceCaisse = false;
        draft.errorUpdatingAvanceCaisse = false;
        break;
      case UPDATE_AVANCE_CAISSE_ERROR:
        draft.updatingAvanceCaisse = false;
        draft.errorUpdatingAvanceCaisse = true;
        break;
      case CLEANUP_STORE_ACTION:
        draft.onBehalfSelection = 'false';
        draft.addingAvanceCaisse = false;
        draft.errorAddingAvanceCaisse = null;
        draft.loadingStaticData = false;
        draft.errorLoadingStaticData = null;
        draft.staticData = null;
        draft.submittingAvanceCaisse = false;
        draft.errorSubmittingAvanceCaisse = null;
        draft.updatingAvanceCaisse = false;
        draft.errorUpdatingAvanceCaisse = null;
        draft.loadingaAvanceCaisseDetails = false;
        draft.errorLoadingAvanceCaisseDetails = null;
        draft.avanceCaisseDetails = null;
        break;
      case CHANGE_ONBEHALF_SELECTION_ACTION:
        draft.onBehalfSelection = action.selection;
        break;
    }
  });

export default avanceCaisseFormReducer;
