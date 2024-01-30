/**
 *
 * DecideOnAvanceVoyageForm
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Box } from '@mui/system';
import {
  Alert,
  Card,
  CardContent,
  Stack,
  Textarea,
  Typography,
} from '@mui/joy';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextField,
} from '@mui/material';
import { Timeline } from '@mui/lab';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import { makeSelectAvanceVoyageIdentity } from 'pages/DecideOnAvanceVoyage/selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  makeSelectAvanceVoyageDetails,
  makeSelectErrorLoadingAvanceVoyageDetails,
} from './selectors';

const mapStateToProps = createStructuredSelector({
  isSideBarVisible: makeSelectIsSideBarVisible(),
  avanceVoyageIdentity: makeSelectAvanceVoyageIdentity(),
  errorLoadingAvanceVoyageDetails: makeSelectErrorLoadingAvanceVoyageDetails(),
  avanceVoyageDetails: makeSelectAvanceVoyageDetails(),
});

export function DecideOnAvanceVoyageForm({ state }) {
  useInjectReducer({ key: 'decideOnAvanceVoyageForm', reducer });
  useInjectSaga({ key: 'decideOnAvanceVoyageForm', saga });

  const dispatch = useDispatch();

  const {
    isSideBarVisible,
    errorLoadingOrdreMissionDetails,
    ordreMissionDetails,
    errorSubmittingOrdreMission,
    ordreMissionIdentity,
  } = useSelector(mapStateToProps);

  // Control data
  const [deciderComment, setDeciderComment] = useState(null);
  const [decisionString, setDecisionString] = useState(null);
  const [returnedToFMByTR, setReturnedToFMByTR] = useState(false);
  const [returnedToTRByFM, setReturnedToTRByFM] = useState(false);
  const [returnedToRequesterByTR, setReturnedToRequesterByTR] = useState(false);

  // Control modal content
  const [modalBody, setModalBody] = useState('');
  const [modalHeader, setModalHeader] = useState('');
  const [modalVisibility, setModalVisibility] = useState(false);
  const [modalSevirity, setModalSevirity] = useState('');

  const readOnly = state === 'VIEW';

  const data = {
    requestId: ordreMissionDetails !== null && ordreMissionDetails?.id,
    deciderComment,
    decisionString,
    returnedToFMByTR,
    returnedToTRByFM,
    returnedToRequesterByTR,
  };
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

DecideOnAvanceVoyageForm.propTypes = {
  state: PropTypes.string.isRequired,
};

export default DecideOnAvanceVoyageForm;
