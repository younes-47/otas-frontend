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
import { DecideOnOrdreMissionForm } from 'containers/DecideOnOrdreMissionForm';
import DecideOnOrdreMissionTable from 'containers/DecideOnOrdreMissionTable';
import { makeSelectChangePageContent } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { cleanupParentDecideOnOrdreMissionPageAction } from './actions';

const mapStateToProps = createStructuredSelector({
  pageContent: makeSelectChangePageContent(),
});
export function DecideOnOrdreMission() {
  useInjectReducer({ key: 'decideOnOrdreMission', reducer });
  // useInjectSaga({ key: 'decideOnOrdreMission', saga });

  const dispatch = useDispatch();
  const { pageContent } = useSelector(mapStateToProps);

  // useEffect(
  //   () => () => {
  //     dispatch(cleanupParentDecideOnOrdreMissionPageAction());
  //   },
  //   [],
  // );

  switch (pageContent) {
    case 'DECIDE':
      return <DecideOnOrdreMissionForm />;
    case 'VIEW':
      return <DecideOnOrdreMissionForm />;
    default:
      return <DecideOnOrdreMissionTable />;
  }
}

DecideOnOrdreMission.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default DecideOnOrdreMission;
