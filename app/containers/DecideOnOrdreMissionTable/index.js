/**
 *
 * DecideOnOrdreMissionTable
 *
 */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Tables from 'components/Tables';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InfoIcon from '@mui/icons-material/Info';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { DateTimeFormater } from 'utils/Custom/stringManipulation';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/joy/Snackbar';
import Typography from '@mui/joy/Typography';
import {
  changePageContentAction,
  setOrdreMissionIdentityAction,
} from 'pages/DecideOnOrdreMission/actions';
import { NumericFormat } from 'react-number-format';
import makeSelectDecideOnOrdreMissionTable, {
  makeSelectErrorLoadingOrdreMissions,
  makeSelectLoadingOrdreMissions,
  makeSelectOrdreMissions,
  makeSelectStatusOrdreMission,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  cleanupDecideOnOrdreMissionTableStoreAction,
  loadOrdreMissionAction,
} from './actions';

const mapStateToProps = createStructuredSelector({
  isSideBarVisible: makeSelectIsSideBarVisible(),
  ordreMissions: makeSelectOrdreMissions(),
  loadingOrdreMissions: makeSelectLoadingOrdreMissions(),
  errorLoadingOrdreMissions: makeSelectErrorLoadingOrdreMissions(),
  statusOrdreMission: makeSelectStatusOrdreMission(),
});

export function DecideOnOrdreMissionTable() {
  useInjectReducer({ key: 'decideOnOrdreMissionTable', reducer });
  useInjectSaga({ key: 'decideOnOrdreMissionTable', saga });

  const dispatch = useDispatch();
  const {
    ordreMissions,
    loadingOrdreMissions,
    errorLoadingOrdreMissions,
    isSideBarVisible,
    statusOrdreMission,
  } = useSelector(mapStateToProps);
  const [snackbarVisibility, setSnackbarVisibility] = useState(false);
  const [snackbarAlertSeverity, setSnackbarAlertSeverity] = useState('');

  const ordreMissionColumns = [
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
      field: 'description',
      hide: false,
      headerName: 'Description',
      flex: 1,
      renderCell: (params) => {
        const { description } = params.row;
        return (
          <Tooltip title={description} placement="bottom-start">
            <Typography level="title-md" variant="plain">
              {description}
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
        const { requestedAmountMAD, requestedAmountEUR } = params.row;
        const toolTipTitle = (
          <>
            <Typography level="title-md" color="success" variant="soft">
              <NumericFormat
                displayType="text"
                value={requestedAmountMAD}
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
              />{' '}
              MAD
            </Typography>
            <Typography level="title-md" color="success" variant="soft">
              <NumericFormat
                displayType="text"
                value={requestedAmountEUR}
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
              />{' '}
              EUR
            </Typography>
          </>
        );
        if (requestedAmountMAD > 0 && requestedAmountEUR > 0) {
          return (
            <Tooltip title={toolTipTitle} placement="right">
              <InfoIcon fontSize="small" color="primary" />
            </Tooltip>
          );
        }
        if (requestedAmountMAD > 0) {
          return (
            <Typography level="title-md" color="success">
              <NumericFormat
                displayType="text"
                value={requestedAmountMAD}
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
              />{' '}
              MAD
            </Typography>
          );
        }
        return (
          <Typography level="title-md" color="success">
            <NumericFormat
              displayType="text"
              value={requestedAmountEUR}
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
            />{' '}
            EUR
          </Typography>
        );
      },
    },
    {
      field: 'missionDuration',
      hide: false,
      headerName: 'Mission Duration',
      flex: 1,
      renderCell: (params) => {
        const { departureDate, returnDate } = params.row;
        const departureDateObject = new Date(departureDate);
        const returnDateObject = new Date(returnDate);
        const durationInMilliseconds = returnDateObject - departureDateObject;
        const durationInDays = Math.ceil(
          durationInMilliseconds / (1000 * 60 * 60 * 24),
        );
        return (
          <Typography variant="plain" level="title-md" color="warning">
            {durationInDays} Days
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
        const { isDecidable } = params.row;
        if (isDecidable) {
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
      field: 'abroad',
      hide: false,
      headerName: 'Abroad',
      type: 'boolean',
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
        const { id, isDecidable } = params.row;
        if (isDecidable) {
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

  const ordreMissionInitialState = {
    columns: {
      columnVisibilityModel: {
        Id: true,
      },
    },
  };

  useEffect(() => {
    if (errorLoadingOrdreMissions === null) {
      dispatch(loadOrdreMissionAction());
      if (statusOrdreMission !== '') {
        switch (statusOrdreMission) {
          case 'signed and approved':
            setSnackbarAlertSeverity('success');
            break;
          case 'rejected':
            setSnackbarAlertSeverity('danger');
            break;
          case 'returned':
            setSnackbarAlertSeverity('warning');
            break;
          default:
            setSnackbarAlertSeverity('success');
        }
        setSnackbarVisibility(true);
      }
    }
  }, [ordreMissions]);

  useEffect(
    () => () => {
      dispatch(cleanupDecideOnOrdreMissionTableStoreAction());
    },
    [],
  );

  // handle buttons
  const handleOnDecideButtonClick = (id) => {
    dispatch(setOrdreMissionIdentityAction(id));
    dispatch(changePageContentAction('DECIDE'));
  };

  const handleOnViewButtonClick = (id) => {
    dispatch(setOrdreMissionIdentityAction(id));
    dispatch(changePageContentAction('VIEW'));
  };

  return (
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
      {!errorLoadingOrdreMissions ? (
        <div style={{ height: '85%', width: '100%' }}>
          <Tables
            getRowId={(row) => row.id}
            disableRowSelectionOnClick
            top={10}
            bottom={10}
            left={0}
            right={0}
            loading={loadingOrdreMissions}
            rows={ordreMissions}
            columns={ordreMissionColumns}
            initialState={ordreMissionInitialState}
          />
        </div>
      ) : (
        <></>
      )}

      <Snackbar
        open={snackbarVisibility}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        size="lg"
        onClose={(event, reason) => {
          if (reason === 'timeout' || reason === 'escapeKeyDown') {
            setSnackbarVisibility(false);
          }
        }}
        endDecorator={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setSnackbarVisibility(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        color={snackbarAlertSeverity !== '' ? snackbarAlertSeverity : 'primary'}
        variant="solid"
      >
        Request has been {statusOrdreMission} successfully!
      </Snackbar>
    </Box>
  );
}

DecideOnOrdreMissionTable.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default DecideOnOrdreMissionTable;
