/**
 *
 * ActualRequesterInputs
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage, useIntl } from 'react-intl';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
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

  const intl = useIntl();
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        marginBottom={2}
      >
        <h1 style={{ fontSize: '18px' }}>
          <FormattedMessage id={messages.title.id} />
        </h1>
      </Box>

      <Box justifyContent="center" textAlign="center" marginBottom={3}>
        <Box display="flex" justifyContent="center" gap={2} marginBottom={2}>
          <TextField
            id="outlined-basic"
            label={intl.formatMessage({ id: messages.firstName.id })}
            variant="outlined"
            value={actualRequester.firstName}
            onChange={(e) =>
              updateActualRequesterData('firstName', e.target.value)
            }
            required
          />
          <TextField
            id="outlined-basic"
            label={intl.formatMessage({ id: messages.lastName.id })}
            variant="outlined"
            value={actualRequester.lastName}
            onChange={(e) =>
              updateActualRequesterData('lastName', e.target.value)
            }
            required
          />
          <TextField
            id="outlined-basic"
            label={intl.formatMessage({ id: messages.employeeId.id })}
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
                label={intl.formatMessage({ id: messages.jobTitle.id })}
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
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                label={intl.formatMessage({ id: messages.department.id })}
              />
            )}
          />
          <Box sx={{ width: 224 }}>
            <FormControl fullWidth>
              <InputLabel required>Manager</InputLabel>
              <Select
                label={intl.formatMessage({ id: messages.manager.id })}
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
