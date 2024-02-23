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
import { NumericFormat } from 'react-number-format';
import { Typography } from '@mui/joy';

const getDotColor = (status) => {
  if (
    status === 'Approved' ||
    status === 'Finalized' ||
    status === 'Funds Collected' ||
    status === 'Funds Prepared'
  )
    return 'success';
  if (
    status === 'Returned' ||
    status === 'Returned for missing evidences' ||
    status === 'Returned To Finance Department for missing Information'
  )
    return 'warning';
  if (status === 'Rejected') return 'error';
  return 'primary';
};
const getDotIcon = (status) => {
  if (
    status === 'Draft' ||
    status === 'Submitted' ||
    status === 'Resubmitted'
  ) {
    return <EditIcon fontSize="small" />;
  }
  if (
    status === 'Approved' ||
    status === 'Finalized' ||
    status === 'Funds Collected' ||
    status === 'Funds Prepared'
  )
    return <CheckIcon fontSize="small" />;
  if (
    status === 'Returned' ||
    status === 'Returned for missing evidences' ||
    status === 'Returned To Finance Department for missing Information'
  )
    return <SettingsBackupRestoreIcon fontSize="small" />;
  if (status === 'Rejected') return <CloseIcon fontSize="small" />;
  if (
    status === "Pending Manager's Approval" ||
    status === "Pending HR's Approval" ||
    status === "Pending Finance Department's Approval" ||
    status === "Pending General Director's Approval" ||
    status === "Pending Vice President's Approval" ||
    status === "Pending Treasury's Validation" ||
    status === 'Preparing Funds'
  ) {
    return <MoreHorizIcon fontSize="small" />;
  }
  return <></>;
};

const CustomizedTimeLine = ({ statusHistory, lastOne }) => (
  <>
    <TimelineItem key={statusHistory.createDate}>
      <TimelineOppositeContent color="textSecondary">
        {DateTimeFormater(statusHistory.createDate)}
        {(statusHistory.status === 'Submitted' ||
          statusHistory.status === 'Resubmitted') &&
          statusHistory.total && (
            <Typography level="body-sm" color="success">
              Total:&nbsp;
              <NumericFormat
                displayType="text"
                value={statusHistory.total}
                fixedDecimalScale
                decimalScale={2}
                defaultValue="0"
                allowNegative={false}
                thousandSeparator={
                  localStorage.getItem('preferredLanguage') === 'en' ? ',' : ' '
                }
                decimalSeparator={
                  localStorage.getItem('preferredLanguage') === 'en' ? '.' : ','
                }
              />
            </Typography>
          )}
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
