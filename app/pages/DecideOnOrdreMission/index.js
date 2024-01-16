/**
 *
 * DecideOnOrdreMission
 *
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { DecideOnAvanceCaisseForm } from 'containers/DecideOnAvanceCaisseForm';
import { DecideOnAvanceCaisseTable } from 'containers/DecideOnAvanceCaisseTable';
import { makeSelectChangePageContent } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { cleanupStoreAction } from './actions';

const mapStateToProps = createStructuredSelector({
  pageContent: makeSelectChangePageContent(),
});
export function DecideOnOrdreMission() {
  useInjectReducer({ key: 'decideOnOrdreMission', reducer });
  useInjectSaga({ key: 'decideOnOrdreMission', saga });

  const dispatch = useDispatch();
  const { pageContent } = useSelector(mapStateToProps);

  useEffect(
    () => () => {
      dispatch(cleanupStoreAction());
    },
    [],
  );

  if (pageContent === 'DECIDE') {
    return <DecideOnAvanceCaisseForm></DecideOnAvanceCaisseForm>;
  }
  return <DecideOnAvanceCaisseTable></DecideOnAvanceCaisseTable>;
}

DecideOnOrdreMission.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default DecideOnOrdreMission;
