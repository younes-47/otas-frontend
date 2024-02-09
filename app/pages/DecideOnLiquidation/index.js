/**
 *
 * DecideOnLiquidation
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
import { DecideOnLiquidationForm } from 'containers/DecideOnLiquidationForm';
import { DecideOnLiquidationTable } from 'containers/DecideOnLiquidationTable';
import makeSelectDecideOnLiquidation, {
  makeSelectChangePageContent,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { cleanupDecideOnLiquidationParentPageStoreAction } from './actions';

const mapStateToProps = createStructuredSelector({
  pageContent: makeSelectChangePageContent(),
});

export function DecideOnLiquidation() {
  useInjectReducer({ key: 'decideOnLiquidation', reducer });
  // useInjectSaga({ key: 'decideOnLiquidation', saga });

  const dispatch = useDispatch();
  const { pageContent } = useSelector(mapStateToProps);

  // useEffect(
  //   () => () => {
  //     dispatch(cleanupDecideOnLiquidationParentPageStoreAction());
  //   },
  //   [],
  // );

  switch (pageContent) {
    case 'DECIDE':
      return <DecideOnLiquidationForm state="DECIDE" />;
    case 'VIEW':
      return <DecideOnLiquidationForm state="VIEW" />;
    default:
      return <DecideOnLiquidationTable />;
  }
}

DecideOnLiquidation.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default DecideOnLiquidation;
