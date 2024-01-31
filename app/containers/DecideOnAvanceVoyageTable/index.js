/**
 *
 * DecideOnAvanceVoyageTable
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Alert, Box, Button, IconButton, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InfoIcon from '@mui/icons-material/Info';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import Tables from 'components/Tables';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import { Link, Typography } from '@mui/joy';
import { DateTimeFormater } from 'utils/Custom/stringManipulation';
import {
  changePageContentAction,
  setOrdreMissionIdentityAction,
} from 'pages/DecideOnOrdreMission/actions';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {
  changeDecideOnAvanceVoyagePageContentAction,
  setAvanceVoyageIdentityAction,
} from 'pages/DecideOnAvanceVoyage/actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  cleanupDecideOnAvanceVoyageTableStoreAction,
  loadAvanceVoyageAction,
} from './actions';
import {
  makeSelectAvanceVoyages,
  makeSelectErrorLoadingAvanceVoyages,
  makeSelectLoadingAvanceVoyages,
} from './selectors';

const mapStateToProps = createStructuredSelector({
  avanceVoyages: makeSelectAvanceVoyages(),
  loadingAvanceVoyages: makeSelectLoadingAvanceVoyages(),
  errorLoadingAvanceVoyages: makeSelectErrorLoadingAvanceVoyages(),
  isSideBarVisible: makeSelectIsSideBarVisible(),
});

export function DecideOnAvanceVoyageTable() {
  useInjectReducer({ key: 'decideOnAvanceVoyageTable', reducer });
  useInjectSaga({ key: 'decideOnAvanceVoyageTable', saga });
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    avanceVoyages,
    loadingAvanceVoyages,
    errorLoadingAvanceVoyages,
    isSideBarVisible,
  } = useSelector(mapStateToProps);

  const [snackbarVisibility, setSnackbarVisibility] = useState(false);
  const [snackbarAlertSeverity, setSnackbarAlertSeverity] = useState('');

  const avanceVoyageColumns = [
    {
      field: 'id',
      hide: false,
      width: 20,
      headerName: '#',
      renderCell: (params) => {
        const { id } = params.row;
        return (
          <Tooltip title={id} placement="bottom-start">
            <Typography level="title-sm" variant="soft">
              {id}
            </Typography>
          </Tooltip>
        );
      },
    },
    {
      field: 'ordreMissionId',
      hide: false,
      flex: 1,
      headerName: '#Mission Order',
      renderCell: (params) => {
        const { ordreMissionId } = params.row;
        return (
          <Tooltip
            title="Navigate to the related Ordre Mission"
            placement="bottom-start"
          >
            <Typography level="title-md" variant="plain">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link
                level="title-sm"
                underline="always"
                onClick={() => handleOnOrdreMissionIdLinkClick(ordreMissionId)}
              >
                #{ordreMissionId}&nbsp;
                <InsertLinkIcon fontSize="small" />
              </Link>
            </Typography>
          </Tooltip>
        );
      },
    },
    {
      field: 'ordreMissionDescription',
      hide: false,
      flex: 1,
      headerName: 'Description',
      renderCell: (params) => {
        const { ordreMissionDescription } = params.row;
        return (
          <Tooltip title={ordreMissionDescription} placement="bottom-start">
            <Typography level="title-md" variant="plain">
              {ordreMissionDescription}
            </Typography>
          </Tooltip>
        );
      },
    },
    {
      field: 'estimatedTotal',
      hide: false,
      headerName: 'Requested Amount',
      flex: 1,
      renderCell: (params) => {
        const { estimatedTotal } = params.row;
        return (
          <Typography level="title-md" color="success">
            {estimatedTotal}
          </Typography>
        );
      },
    },
    {
      field: 'currency',
      hide: false,
      headerName: 'Currency',
      flex: 1,
      renderCell: (params) => {
        const { currency } = params.row;
        return (
          <Typography level="title-md" variant="plain">
            {currency}
          </Typography>
        );
      },
    },
    {
      field: 'status',
      hide: false,
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => {
        const { nextDeciderUserName } = params.row;
        if (nextDeciderUserName === localStorage.getItem('username')) {
          return (
            <Alert
              icon={false}
              severity="info"
              variant="outlined"
              style={{
                paddingBottom: '0.3px',
                paddingTop: '0.3px',
                borderRadius: '40px',
              }}
            >
              <AutorenewIcon fontSize="small" /> Pending
            </Alert>
          );
        }

        return (
          <Alert
            icon={false}
            severity="success"
            variant="outlined"
            style={{
              paddingBottom: '0.3px',
              paddingTop: '0.3px',
              borderRadius: '40px',
            }}
          >
            <BeenhereIcon fontSize="small" /> Decided Upon
          </Alert>
        );
      },
    },
    {
      field: 'onBehalf',
      hide: false,
      type: 'boolean',
      headerName: 'onBehalf',
      flex: 1,
    },
    {
      field: 'createDate',
      hide: false,
      headerName: 'Created On',
      flex: 1,
      renderCell: (params) => {
        const { createDate } = params.row;
        return (
          <Typography level="title-md" variant="plain">
            {DateTimeFormater(createDate)}
          </Typography>
        );
      },
    },
    {
      field: '',
      hide: false,
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => {
        const { id, nextDeciderUserName } = params.row;
        if (nextDeciderUserName === localStorage.getItem('username')) {
          return (
            <Button
              variant="contained"
              color="success"
              sx={{ mr: '10px' }}
              startIcon={<EditIcon />}
              onClick={() => {
                handleOnDecideButtonClick(id);
              }}
            >
              Decide
            </Button>
          );
        }

        return (
          <Button
            variant="contained"
            color="primary"
            startIcon={<VisibilityIcon />}
            onClick={() => {
              handleOnViewButtonClick(id);
            }}
          >
            View
          </Button>
        );
      },
    },
  ];

  const avanceVoyageInitialState = {
    columns: {
      columnVisibilityModel: {
        Id: true,
      },
    },
  };

  useEffect(
    () => () => {
      dispatch(cleanupDecideOnAvanceVoyageTableStoreAction());
    },
    [],
  );

  useEffect(() => {
    if (errorLoadingAvanceVoyages === null) {
      dispatch(loadAvanceVoyageAction());
    }
  }, [avanceVoyages]);

  const handleOnOrdreMissionIdLinkClick = (ordreMissionId) => {
    dispatch(setOrdreMissionIdentityAction(ordreMissionId));
    dispatch(changePageContentAction('VIEW'));
    history.push('/decide-on-requests/decide-on-ordre-mission');
  };
  const handleOnDecideButtonClick = (id) => {
    dispatch(setAvanceVoyageIdentityAction(id));
    dispatch(changeDecideOnAvanceVoyagePageContentAction('DECIDE'));
  };

  const handleOnViewButtonClick = (id) => {
    dispatch(setAvanceVoyageIdentityAction(id));
    dispatch(changeDecideOnAvanceVoyagePageContentAction('VIEW'));
  };
  return (
    <div>
      <Box
        position="fixed"
        top={64}
        bottom={0}
        left={isSideBarVisible ? 200 : 0}
        right={0}
        m={1}
        sx={{
          overflowY: 'scroll',
          '&::-webkit-scrollbar': { display: 'flex' },
          msOverflowStyle: 'none',
          scrollbarWidth: '2',
          overflow: 'auto',
        }}
      >
        {!errorLoadingAvanceVoyages ? (
          <div style={{ height: '85%', width: '100%' }}>
            <Tables
              getRowId={(row) => row.id}
              disableRowSelectionOnClick
              top={10}
              bottom={10}
              left={0}
              right={0}
              loading={loadingAvanceVoyages}
              rows={avanceVoyages}
              columns={avanceVoyageColumns}
              initialState={avanceVoyageInitialState}
            />
          </div>
        ) : (
          <></>
        )}
      </Box>
    </div>
  );
}

DecideOnAvanceVoyageTable.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default DecideOnAvanceVoyageTable;
