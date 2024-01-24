/**
 *
 * DisplayUserinfo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Box, Paper, Typography } from '@mui/material';
import messages from './messages';

function DisplayUserinfo({ userData = null }) {
  const managerUsername =
    userData !== null
      ? userData?.managerUserName
      : localStorage.getItem('managerUserName');
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" align="left" gutterBottom>
        Requester Information
      </Typography>
      {userData !== null && (
        <Typography variant="caption" align="left" gutterBottom>
          *This request has been created on behalf of someone whose information
          is specified below
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
          <Box>
            <Typography variant="overline">First Name</Typography>
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
            <Typography variant="overline">Last Name</Typography>
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
            <Typography variant="overline">Registration Number</Typography>
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
            <Typography variant="overline">Title</Typography>
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
            <Typography variant="overline">Department</Typography>
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
            <Typography variant="overline">Manager</Typography>
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
    </div>
  );
}

DisplayUserinfo.propTypes = {
  userData: PropTypes.object,
};

export default DisplayUserinfo;
