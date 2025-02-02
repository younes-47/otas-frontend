/**
 *
 * DisplayUserinfo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import messages from './messages';

function DisplayUserinfo({ userData = null, isActualRequester = true }) {
  const managerUsername =
    userData !== null
      ? userData?.managerUserName
      : localStorage.getItem('managerUserName');
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
      marginBottom={4}
    >
      {(userData === null && isActualRequester === true) ||
        (userData !== null && isActualRequester === false && (
          <Typography variant="h6" align="left" gutterBottom>
            <FormattedMessage id={messages.header.id} />
          </Typography>
        ))}

      {userData !== null && isActualRequester === true && (
        <Typography variant="caption" align="left" gutterBottom>
          <FormattedMessage id={messages.requestOnBehalf.id} />
        </Typography>
      )}
      <Paper elevation={2}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 2fr)',
            width: '100%',
            p: 2,
            borderRadius: 2,
            fontSize: '0.875rem',
            fontWeight: '700',
          }}
          marginBottom={3}
          gap={3}
        >
          <Box minWidth={150}>
            <Typography variant="overline">
              <FormattedMessage id={messages.firstName.id} />
            </Typography>
            <Box
              sx={{
                bgcolor: 'grey.200',
                border: '1px solid',
                borderColor: 'grey.300',
                p: 1,
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '700',
              }}
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="p" align="left">
                {userData !== null
                  ? userData?.firstName
                  : localStorage.getItem('firstName')}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="overline">
              <FormattedMessage id={messages.lastName.id} />
            </Typography>
            <Box
              sx={{
                bgcolor: 'grey.200',
                border: '1px solid',
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                p: 1,
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '700',
              }}
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="p" align="left">
                {userData !== null
                  ? userData?.lastName
                  : localStorage.getItem('lastName')}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="overline">
              <FormattedMessage id={messages.employeeId.id} />
            </Typography>
            <Box
              sx={{
                bgcolor: 'grey.200',
                border: '1px solid',
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                p: 1,
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '700',
              }}
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="p" align="left">
                {userData !== null
                  ? userData?.registrationNumber
                  : localStorage.getItem('registrationNumber')}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="overline">
              <FormattedMessage id={messages.title.id} />
            </Typography>
            <Box
              sx={{
                bgcolor: 'grey.200',
                border: '1px solid',
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                p: 1,
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '700',
              }}
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="p" align="left">
                {userData !== null
                  ? userData?.jobTitle
                  : localStorage.getItem('jobTitle')}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="overline">
              <FormattedMessage id={messages.department.id} />
            </Typography>
            <Box
              sx={{
                bgcolor: 'grey.200',
                border: '1px solid',
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                p: 1,
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '700',
              }}
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="p" align="left">
                {userData !== null
                  ? userData?.department
                  : localStorage.getItem('department')}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="overline">
              <FormattedMessage id={messages.manager.id} />
            </Typography>
            <Box
              sx={{
                bgcolor: 'grey.200',
                border: '1px solid',
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                p: 1,
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '700',
              }}
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="p" align="left">
                {managerUsername !== null ? managerUsername : 'N/A'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

DisplayUserinfo.propTypes = {
  userData: PropTypes.object,
  isActualRequester: PropTypes.bool,
};

export default DisplayUserinfo;
