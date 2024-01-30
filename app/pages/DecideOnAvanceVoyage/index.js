/**
 *
 * DecideOnAvanceVoyage
 *
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { DecideOnAvanceVoyageForm } from 'containers/DecideOnAvanceVoyageForm';
import { DecideOnAvanceVoyageTable } from 'containers/DecideOnAvanceVoyageTable';
import { makeSelectChangePageContent } from './selectors';
import reducer from './reducer';

const mapStateToProps = createStructuredSelector({
  pageContent: makeSelectChangePageContent(),
});

export function DecideOnAvanceVoyage() {
  useInjectReducer({ key: 'decideOnAvanceVoyage', reducer });

  const dispatch = useDispatch();
  const { pageContent } = useSelector(mapStateToProps);

  // useEffect(
  //   () => () => {
  //     dispatch(cleanupStoreAction());
  //   },
  //   [],
  // );

  switch (pageContent) {
    case 'DECIDE':
      return <DecideOnAvanceVoyageForm state="DECIDE" />;
    case 'VIEW':
      return <DecideOnAvanceVoyageForm state="VIEW" />;
    default:
      return <DecideOnAvanceVoyageTable />;
  }
}

DecideOnAvanceVoyage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default DecideOnAvanceVoyage;
