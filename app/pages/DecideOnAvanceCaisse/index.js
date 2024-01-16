/**
 *
 * DecideOnAvanceCaisse
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { DecideOnAvanceCaisseForm } from 'containers/DecideOnAvanceCaisseForm';
import { DecideOnAvanceCaisseTable } from 'containers/DecideOnAvanceCaisseTable';
import { makeSelectChangePageContent } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { cleanupStoreAction } from './actions';

const mapStateToProps = createStructuredSelector({
  pageContent: makeSelectChangePageContent(),
});

export function DecideOnAvanceCaisse() {
  useInjectReducer({ key: 'decideOnAvanceCaisse', reducer });
  useInjectSaga({ key: 'decideOnAvanceCaisse', saga });

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

DecideOnAvanceCaisse.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default DecideOnAvanceCaisse;
