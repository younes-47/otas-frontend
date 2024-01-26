/**
 *
 * DecideOnOrdreMissionForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectDecideOnOrdreMissionForm from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function DecideOnOrdreMissionForm(state) {
  useInjectReducer({ key: 'decideOnOrdreMissionForm', reducer });
  useInjectSaga({ key: 'decideOnOrdreMissionForm', saga });

  return <div></div>;
}

DecideOnOrdreMissionForm.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // decideOnOrdreMissionForm: makeSelectDecideOnOrdreMissionForm(),
});

export default DecideOnOrdreMissionForm;
