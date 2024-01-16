/**
 *
 * DecideOnDepenseCaisseForm
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
import makeSelectDecideOnDepenseCaisseForm from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function DecideOnDepenseCaisseForm() {
  useInjectReducer({ key: 'decideOnDepenseCaisseForm', reducer });
  useInjectSaga({ key: 'decideOnDepenseCaisseForm', saga });

  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

DecideOnDepenseCaisseForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  decideOnDepenseCaisseForm: makeSelectDecideOnDepenseCaisseForm(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(DecideOnDepenseCaisseForm);
