/**
 *
 * ActualRequesterInputs
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import {
  Autocomplete,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material';
import { Typography } from '@mui/joy';
import messages from './messages';

function ActualRequesterInputs({
  staticData,
  actualRequester,
  updateActualRequesterData,
}) {
  let uniqueId = 0;

  const mappedJobTitles = staticData?.jobTitles.map((value) => ({
    // eslint-disable-next-line no-plusplus
    id: uniqueId++,
    label: value,
  }));

  const CustomPaper = React.forwardRef((props, ref) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Paper ref={ref} {...props} sx={{ textAlign: 'left' }} />
  ));
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
            label="Employee ID"
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
            options={mappedJobTitles}
            sx={{ width: 224 }}
            value={actualRequester.jobTitle ? actualRequester.jobTitle : null}
            PaperComponent={CustomPaper}
            required
            onChange={(e, newValue) =>
              updateActualRequesterData(
                'jobTitle',
                newValue?.label ? newValue?.label : '',
              )
            }
            getOptionKey={(option) => option.id}
            renderInput={(params) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                label="Job Title*"
                onChange={(e) =>
                  updateActualRequesterData('jobTitle', e.target.value)
                }
              />
            )}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={staticData.departments}
            sx={{ width: 224 }}
            value={
              actualRequester.department ? actualRequester.department : null
            }
            onChange={(e, newValue) =>
              updateActualRequesterData('department', newValue)
            }
            PaperComponent={CustomPaper}
            required
            renderInput={(params) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <TextField {...params} label="Department*" />
            )}
          />
          <Box sx={{ width: 224 }}>
            <FormControl fullWidth>
              <InputLabel required>Manager</InputLabel>
              <Select
                label="Manager"
                value={actualRequester.managerUserName}
                onChange={(e) =>
                  updateActualRequesterData('managerUserName', e.target.value)
                }
                required
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                    },
                  },
                  TransitionProps: {
                    timeout: 0,
                  },
                }}
              >
                {Object.values(staticData.managers).map((manager) => (
                  <MenuItem key={manager.username} value={manager.username}>
                    {manager.firstName}&nbsp;{manager.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={staticData.managers}
            sx={{ width: 224 }}
            value={actualRequester.managerUserName}
            PaperComponent={CustomPaper}
            onChange={(e, newValue) =>
              updateActualRequesterData('managerUserName', newValue.username)
            }
            // isOptionEqualToValue={(option, value) => option.username === value}
            getOptionLabel={(option) => option.username}
            renderOption={(props, option) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <li {...props}>
                <Typography level="body-md">{`${option.firstName} ${option.lastName}`}</Typography>
              </li>
            )}
            required
            renderInput={(params) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <TextField {...params} label="Manager*" />
            )}
          /> */}
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
