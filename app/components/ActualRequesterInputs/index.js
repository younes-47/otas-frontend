/**
 *
 * ActualRequesterInputs
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Autocomplete, Box, TextField } from '@mui/material';
import messages from './messages';

function ActualRequesterInputs({
  staticData,
  actualRequester,
  updateActualRequesterData,
}) {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        marginBottom={2}
      >
        <h1 style={{ fontSize: '18px' }}>
          Please fill the actual requester information*
        </h1>
      </Box>

      <Box justifyContent="center" textAlign="center" marginBottom={3}>
        <Box display="flex" justifyContent="center" gap={2} marginBottom={2}>
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            value={actualRequester.firstName}
            onChange={(e) =>
              updateActualRequesterData('firstName', e.target.value)
            }
            required
          />
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            value={actualRequester.lastName}
            onChange={(e) =>
              updateActualRequesterData('lastName', e.target.value)
            }
            required
          />
          <TextField
            id="outlined-basic"
            label="Registration Number"
            variant="outlined"
            value={actualRequester.registrationNumber}
            onChange={(e) =>
              updateActualRequesterData('registrationNumber', e.target.value)
            }
            required
          />
        </Box>
        <Box display="flex" justifyContent="center" gap={2} marginBottom={2}>
          <Autocomplete
            freeSolo
            disablePortal
            id="combo-box-demo"
            options={staticData.jobTitles}
            sx={{ width: 224 }}
            value={actualRequester.jobTitle}
            onChange={(e, newValue) =>
              updateActualRequesterData('jobTitle', newValue)
            }
            required
            renderInput={(params) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <TextField {...params} label="Job Title" />
            )}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={staticData.departments}
            sx={{ width: 224 }}
            value={actualRequester.department}
            onChange={(e, newValue) =>
              updateActualRequesterData('department', newValue)
            }
            required
            renderInput={(params) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <TextField {...params} label="Department" />
            )}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={staticData.managersUsernames}
            sx={{ width: 224 }}
            value={actualRequester.managerUserName}
            onChange={(e, newValue) =>
              updateActualRequesterData('managerUserName', newValue)
            }
            required
            renderInput={(params) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <TextField {...params} label="Manager" />
            )}
          />
        </Box>
      </Box>
    </>
  );
}

ActualRequesterInputs.propTypes = {
  staticData: PropTypes.object.isRequired,
  actualRequester: PropTypes.object.isRequired,
  updateActualRequesterData: PropTypes.func.isRequired,
};

export default ActualRequesterInputs;
