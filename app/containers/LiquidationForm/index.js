/**
 *
 * LiquidationForm
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import { makeSelectLiquidationIdentity } from 'pages/Liquidation/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Option, Radio, RadioGroup, Select, Typography } from '@mui/joy';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  makeSelectAddLiquidation,
  makeSelectErrorLoadingLiquidationDetails,
  makeSelectErrorLoadingRequestsToLiquidate,
  makeSelectErrorSubmittingLiquidation,
  makeSelectErrorUpdatingLiquidation,
  makeSelectLiquidationDetails,
  makeSelectRequestTypeToLiquidate,
  makeSelectRequestsToLiquidate,
} from './selectors';
import {
  cleanupLiquidationFormPageStoreAction,
  loadRequestsToLiquidateAction,
  selectRequestTypeToLiquidateAction,
} from './actions';

const mapStateToProps = createStructuredSelector({
  isSideBarVisible: makeSelectIsSideBarVisible(),
  errorAddingLiquidation: makeSelectAddLiquidation(),
  errorUpdatingLiquidation: makeSelectErrorUpdatingLiquidation(),
  errorSubmittingLiquidation: makeSelectErrorSubmittingLiquidation(),
  errorLoadingLiquidationDetails: makeSelectErrorLoadingLiquidationDetails(),
  liquidationDetails: makeSelectLiquidationDetails(),
  liquidationIdentity: makeSelectLiquidationIdentity(),
  requestTypeToLiquidate: makeSelectRequestTypeToLiquidate(),
  errorLoadingRequestsToLiquidate: makeSelectErrorLoadingRequestsToLiquidate(),
  requestsToLiquidate: makeSelectRequestsToLiquidate(),
});

export function LiquidationForm({ state }) {
  useInjectReducer({ key: 'liquidationForm', reducer });
  useInjectSaga({ key: 'liquidationForm', saga });
  const dispatch = useDispatch();
  const {
    isSideBarVisible,
    errorAddingLiquidation,
    errorUpdatingLiquidation,
    errorSubmittingLiquidation,
    errorLoadingLiquidationDetails,
    liquidationDetails,
    liquidationIdentity,
    requestTypeToLiquidate,
    requestsToLiquidate,
  } = useSelector(mapStateToProps);
  const avanceVoyageLabel = (
    <Typography color="primary" level="title-lg">
      Avance Voyage
    </Typography>
  );
  const avanceCaisseLabel = (
    <Typography color="primary" level="title-lg">
      Avance Caisse
    </Typography>
  );

  useEffect(() => {
    if (requestTypeToLiquidate !== null) {
      dispatch(loadRequestsToLiquidateAction(requestTypeToLiquidate));
    }
  }, [requestTypeToLiquidate]);

  useEffect(
    () => () => {
      dispatch(cleanupLiquidationFormPageStoreAction());
    },
    [],
  );

  return (
    <Box
      id="main-box"
      position="fixed"
      top={64}
      bottom={0}
      left={isSideBarVisible ? 200 : 0}
      right={0}
      sx={{
        overflowY: 'scroll',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        overflow: 'auto',
      }}
    >
      {/*  */}
      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        marginTop={2}
        marginBottom={3}
      >
        <Typography level="h2">
          Please choose a Request Type to liquidate:
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <RadioGroup
          orientation="horizontal"
          aria-labelledby="segmented-controls-example"
          name="justify"
          value={requestTypeToLiquidate}
          onChange={(event) =>
            dispatch(selectRequestTypeToLiquidateAction(event.target.value))
          }
          sx={{
            minHeight: 48,
            padding: '4px',
            borderRadius: '12px',
            bgcolor: 'neutral.softBg',
            '--RadioGroup-gap': '4px',
            '--Radio-actionRadius': '8px',
          }}
        >
          <Radio
            key="AV"
            color="neutral"
            value="AV"
            disableIcon
            label={avanceVoyageLabel}
            variant="plain"
            sx={{
              px: 2,
              alignItems: 'center',
            }}
            slotProps={{
              action: ({ checked }) => ({
                sx: {
                  ...(checked && {
                    bgcolor: 'background.surface',
                    boxShadow: 'sm',
                    '&:hover': {
                      bgcolor: 'background.surface',
                    },
                  }),
                },
              }),
            }}
          />
          <Radio
            key="AC"
            color="neutral"
            value="AC"
            disableIcon
            label={avanceCaisseLabel}
            variant="plain"
            sx={{
              px: 2,
              alignItems: 'center',
            }}
            slotProps={{
              action: ({ checked }) => ({
                sx: {
                  ...(checked && {
                    bgcolor: 'background.surface',
                    boxShadow: 'sm',
                    '&:hover': {
                      bgcolor: 'background.surface',
                    },
                  }),
                },
              }),
            }}
          />
        </RadioGroup>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <Select
          placeholder="Select address"
          sx={{ width: 240 }}
          slotProps={{
            listbox: {
              placement: 'bottom-start',
            },
          }}
        >
          {requestsToLiquidate?.map((req) => (
            <Option value={req.id}>
              #{req.id}&nbsp;-&nbsp;{req.description}
            </Option>
          ))}
        </Select>
      </Box>
    </Box>
  );
}

LiquidationForm.propTypes = {
  state: PropTypes.string.isRequired,
};

export default LiquidationForm;
