/**
 *
 * DecideOnDepenseCaisse
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
import { DecideOnDepenseCaisseForm } from 'containers/DecideOnDepenseCaisseForm';
import { DecideOnDepenseCaisseTable } from 'containers/DecideOnDepenseCaisseTable';
import makeSelectDecideOnDepenseCaisse, {
  makeSelectChangePageContent,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { cleanupStoreAction } from './actions';

const mapStateToProps = createStructuredSelector({
  pageContent: makeSelectChangePageContent(),
});

export function DecideOnDepenseCaisse() {
  useInjectReducer({ key: 'decideOnDepenseCaisse', reducer });
  useInjectSaga({ key: 'decideOnDepenseCaisse', saga });

  const dispatch = useDispatch();
  const { pageContent } = useSelector(mapStateToProps);

  useEffect(
    () => () => {
      dispatch(cleanupStoreAction());
    },
    [],
  );

  if (pageContent === 'DECIDE') {
    return <DecideOnDepenseCaisseForm></DecideOnDepenseCaisseForm>;
  }
  return <DecideOnDepenseCaisseTable></DecideOnDepenseCaisseTable>;
}

DecideOnDepenseCaisse.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default DecideOnDepenseCaisse;
