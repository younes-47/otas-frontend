/*
 *
 * DepenseCaisseForm actions
 *
 */

import { CHANGE_ONBEHALF_SELECTION_ACTION, DEFAULT_ACTION } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function SelectOnBehalfAction(selection) {
  return {
    type: CHANGE_ONBEHALF_SELECTION_ACTION,
    selection,
  };
}
