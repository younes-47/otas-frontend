/*
 *
 * AvanceCaisseForm reducer
 *
 */
import produce from 'immer';
import { CHANGE_ONBEHALF_SELECTION_ACTION, DEFAULT_ACTION } from './constants';

export const initialState = {
  onBehalfSelection: 'false',
};

/* eslint-disable default-case, no-param-reassign */
const avanceCaisseFormReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CHANGE_ONBEHALF_SELECTION_ACTION:
        draft.onBehalfSelection = action.selection;
        break;
    }
  });

export default avanceCaisseFormReducer;
