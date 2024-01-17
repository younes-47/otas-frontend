/**
 *
 * AvanceVoyageView
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import { Button, Divider, FormLabel } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { changePageContentAction } from 'pages/AvanceVoyage/actions';
import makeSelectAvanceVoyageView, {
  makeSelectAvanceVoyageDetails,
  makeSelectAvanceVoyageIdentity,
  makeSelectErrorLoadingAvanceVoyage,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  cleanupAvanceVoyageViewStoreAction,
  loadAvanceVoyageAction,
} from './actions';

const mapStateToProps = createStructuredSelector({
  avanceVoyageView: makeSelectAvanceVoyageView(),
  isSideBarVisible: makeSelectIsSideBarVisible(),
  avanceVoyageDetails: makeSelectAvanceVoyageDetails(),
  avanceVoyageIdentity: makeSelectAvanceVoyageIdentity(),
  errorLoadingAvanceVoyage: makeSelectErrorLoadingAvanceVoyage(),
});

export function AvanceVoyageView() {
  useInjectReducer({ key: 'avanceVoyageView', reducer });
  useInjectSaga({ key: 'avanceVoyageView', saga });
  const dispatch = useDispatch();
  const {
    errorLoadingAvanceVoyage,
    isSideBarVisible,
    avanceVoyageDetails,
    avanceVoyageIdentity,
  } = useSelector(mapStateToProps);

  // Handle on buttons click
  const handleOnReturnButtonClick = () => {
    dispatch(cleanupAvanceVoyageViewStoreAction());
    dispatch(changePageContentAction('TABLE'));
  };
  useEffect(() => {
    if (errorLoadingAvanceVoyage === null && avanceVoyageIdentity !== null) {
      dispatch(loadAvanceVoyageAction(avanceVoyageIdentity));
    }
  }, [avanceVoyageIdentity]);

  return (
    <Box
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
      {/* THE HEADER */}
      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        marginBottom={2}
      >
        <h1 style={{ fontSize: '30px' }}>
          Avance Voyage #{avanceVoyageDetails?.id} Details
        </h1>
      </Box>

      {/* DIVIDER */}
      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        marginBottom={3}
      >
        <Divider style={{ width: '60%', opacity: 0.7 }} />
      </Box>

      {/* USER INFO */}

      {/* DIVIDER */}
      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        marginBottom={1}
      >
        <Divider style={{ width: '60%', opacity: 0.7 }} />
      </Box>

      {/* Calculated Total */}
      <Box display="flex" justifyContent="center">
        <Box display="flex" justifyContent="flex-end" width="60%">
          <Box display="flex" flexDirection="column">
            <Box display="flex" justifyContent="space-between" gap={5}>
              <h1 style={{ fontSize: '1.1rem' }}>
                Estimated Total {avanceVoyageDetails?.estimatedTotal}{' '}
                {avanceVoyageDetails?.currency}
              </h1>
            </Box>
          </Box>
        </Box>
      </Box>

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        margin={10}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={handleOnReturnButtonClick}
        >
          Return
        </Button>
      </Stack>
    </Box>
  );
}

AvanceVoyageView.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default AvanceVoyageView;
