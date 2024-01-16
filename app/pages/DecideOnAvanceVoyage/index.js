/**
 *
 * DecideOnAvanceVoyage
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
import { DecideOnAvanceVoyageForm } from 'containers/DecideOnAvanceVoyageForm';
import { DecideOnAvanceVoyageTable } from 'containers/DecideOnAvanceVoyageTable';
import makeSelectDecideOnAvanceVoyage, {
  makeSelectChangePageContent,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { cleanupStoreAction } from './actions';

const mapStateToProps = createStructuredSelector({
  pageContent: makeSelectChangePageContent(),
});

export function DecideOnAvanceVoyage() {
  useInjectReducer({ key: 'decideOnAvanceVoyage', reducer });
  useInjectSaga({ key: 'decideOnAvanceVoyage', saga });

  const dispatch = useDispatch();
  const { pageContent } = useSelector(mapStateToProps);

  useEffect(
    () => () => {
      dispatch(cleanupStoreAction());
    },
    [],
  );

  if (pageContent === 'DECIDE') {
    return <DecideOnAvanceVoyageForm></DecideOnAvanceVoyageForm>;
  }
  return <DecideOnAvanceVoyageTable></DecideOnAvanceVoyageTable>;
}

DecideOnAvanceVoyage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default DecideOnAvanceVoyage;
