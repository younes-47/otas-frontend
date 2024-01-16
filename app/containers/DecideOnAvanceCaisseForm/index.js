/**
 *
 * DecideOnAvanceCaisseForm
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
import makeSelectDecideOnAvanceCaisseForm from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function DecideOnAvanceCaisseForm() {
  useInjectReducer({ key: 'decideOnAvanceCaisseForm', reducer });
  useInjectSaga({ key: 'decideOnAvanceCaisseForm', saga });

  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

DecideOnAvanceCaisseForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  decideOnAvanceCaisseForm: makeSelectDecideOnAvanceCaisseForm(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(DecideOnAvanceCaisseForm);
