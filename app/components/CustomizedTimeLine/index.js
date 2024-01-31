/**
 *
 * CustomizedTimeLine
 *
 */

import * as React from 'react';
import PropTypes from 'prop-types';
import Timeline from '@mui/lab/Timeline';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckIcon from '@mui/icons-material/Check';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { DateTimeFormater } from 'utils/Custom/stringManipulation';

const getDotColor = (status) => {
  if (status === 'Approved') return 'success';
  if (status === 'Returned') return 'warning';
  if (status === 'Rejected') return 'error';
  return 'primary';
};
const getDotIcon = (status) => {
  if (status === 'Draft' || status === 'Submitted') {
    return <EditIcon fontSize="small"></EditIcon>;
  }
  if (status === 'Approved') return <CheckIcon fontSize="small"></CheckIcon>;
  if (status === 'Returned')
    return (
      <SettingsBackupRestoreIcon fontSize="small"></SettingsBackupRestoreIcon>
    );
  if (status === 'Rejected') return <CloseIcon fontSize="small"></CloseIcon>;
  if (
    status === "Pending Manager's Approval" ||
    status === "Pending HR's Approval" ||
    status === "Pending Finance Department's Approval" ||
    status === "Pending General Director's Approval" ||
    status === "Pending Vice President's Approval" ||
    status === "Pending Treasury's Validation" ||
    status === 'Preparing Funds'
  ) {
    return <MoreHorizIcon fontSize="small"></MoreHorizIcon>;
  }
  return <></>;
};

const CustomizedTimeLine = ({ statusHistory, lastOne }) => (
  <>
    <TimelineItem>
      <TimelineOppositeContent color="textSecondary">
        {DateTimeFormater(statusHistory.createDate)}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot
          color={getDotColor(statusHistory.status)}
          variant={lastOne ? 'outlined' : undefined}
        >
          {getDotIcon(statusHistory.status)}
        </TimelineDot>
        {lastOne === false && <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        {statusHistory.deciderFirstName !== 'system' &&
          `${statusHistory.status} `}
        {statusHistory.deciderLevel !== null &&
        (statusHistory.status === 'Approved' ||
          statusHistory.status === 'Returned' ||
          statusHistory.status === 'Rejected') &&
        statusHistory.deciderFirstName !== 'system'
          ? `by ${statusHistory.deciderFirstName} ${statusHistory.deciderLastName}`
          : statusHistory.deciderComment}
      </TimelineContent>
    </TimelineItem>
  </>
);

CustomizedTimeLine.propTypes = {
  statusHistory: PropTypes.object.isRequired,
  lastOne: PropTypes.bool.isRequired,
};

export default CustomizedTimeLine;
