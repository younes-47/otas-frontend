/**
 *
 * DecideOnDepenseCaisse
 *
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { DecideOnDepenseCaisseForm } from 'containers/DecideOnDepenseCaisseForm';
import { DecideOnDepenseCaisseTable } from 'containers/DecideOnDepenseCaisseTable';
import { makeSelectChangePageContent } from './selectors';
import reducer from './reducer';

const mapStateToProps = createStructuredSelector({
  pageContent: makeSelectChangePageContent(),
});

export function DecideOnDepenseCaisse() {
  useInjectReducer({ key: 'decideOnDepenseCaisse', reducer });
  // useInjectSaga({ key: 'decideOnDepenseCaisse', saga });

  const dispatch = useDispatch();
  const { pageContent } = useSelector(mapStateToProps);

  // useEffect(
  //   () => () => {
  //     dispatch(cleanupParentDecideOnDepenseCaisseStoreAction());
  //   },
  //   [],
  // );

  switch (pageContent) {
    case 'DECIDE':
      return <DecideOnDepenseCaisseForm state="DECIDE" />;
    case 'VIEW':
      return <DecideOnDepenseCaisseForm state="VIEW" />;
    default:
      return <DecideOnDepenseCaisseTable />;
  }
}

DecideOnDepenseCaisse.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default DecideOnDepenseCaisse;
