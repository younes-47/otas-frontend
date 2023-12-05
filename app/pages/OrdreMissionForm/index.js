/**
 *
 * OrdreMissionForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectOrdreMissionForm from './selectors';
import reducer from './reducer';
import saga from './saga';

export function OrdreMissionForm() {
  useInjectReducer({ key: 'ordreMissionForm', reducer });
  useInjectSaga({ key: 'ordreMissionForm', saga });

  return (
    <div>
      <Helmet>
        <title>OrdreMissionForm</title>
        <meta name="description" content="Description of OrdreMissionForm" />
      </Helmet>
    </div>
  );
}

OrdreMissionForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ordreMissionForm: makeSelectOrdreMissionForm(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(OrdreMissionForm);
