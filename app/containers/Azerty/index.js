/**
 *
 * Azerty
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
import makeSelectAzerty from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const mapStateToProps = createStructuredSelector({
  azerty: makeSelectAzerty(),
});
export function Azerty() {
  useInjectReducer({ key: 'azerty', reducer });
  useInjectSaga({ key: 'azerty', saga });

  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Azerty.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


export default Azerty;
