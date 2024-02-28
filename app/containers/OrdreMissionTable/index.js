import React, { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import Tables from 'components/Tables';
import DeleteIcon from '@mui/icons-material/Delete';
import { DateTimeFormater } from 'utils/Custom/stringManipulation';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/joy/Typography';
import {
  ChangePageContentAction,
  setOrdreMissionIdentityAction,
} from 'pages/OrdreMission/actions';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import Snackbar from '@mui/joy/Snackbar';
import { FormattedMessage, useIntl } from 'react-intl';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectErrorDeletingOrdreMission,
  makeSelectErrorLoadingOrdreMissions,
  makeSelectLoadingOrdreMissions,
  makeSelectOrdreMissions,
  makeSelectStatusOrdreMission,
} from './selectors';
import {
  cleanupOrdreMissionTableStoreAction,
  deleteOrdreMissionAction,
  loadOrdreMissionAction,
  nullifyErrorDeletingOrdreMissionAction,
  setOrdreMissionStatusAction,
} from './actions';
import messages from './messages';

const mapStateToProps = createStructuredSelector({
  loadingOrdreMissions: makeSelectLoadingOrdreMissions(),
  errorLoadingOrdreMissions: makeSelectErrorLoadingOrdreMissions(),
  errorDeletingOrdreMission: makeSelectErrorDeletingOrdreMission(),
  ordreMissions: makeSelectOrdreMissions(),
  isSideBarVisible: makeSelectIsSideBarVisible(),
  statusOrdreMission: makeSelectStatusOrdreMission(),
});

export function OrdreMissionTable() {
  useInjectReducer({ key: 'ordreMissionTable', reducer });
  useInjectSaga({ key: 'ordreMissionTable', saga });
  const dispatch = useDispatch();
  const {
    ordreMissions,
    loadingOrdreMissions,
    errorLoadingOrdreMissions,
    isSideBarVisible,
    statusOrdreMission,
    errorDeletingOrdreMission,
  } = useSelector(mapStateToProps);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [ordreMissionToDeleteId, setOrdreMissionToDeleteId] = useState();
  const [snackbarVisibility, setSnackbarVisibility] = useState(false);
  const [snackbarAlertSeverity, setSnackbarAlertSeverity] = useState('');

  useEffect(() => {
    if (errorLoadingOrdreMissions === null) {
      dispatch(loadOrdreMissionAction());
      if (statusOrdreMission !== '') {
        switch (statusOrdreMission) {
          case 'saved':
            setSnackbarAlertSeverity('primary');
            break;
          case 'updated':
            setSnackbarAlertSeverity('primary');
            break;
          default:
            setSnackbarAlertSeverity('success');
        }
        setSnackbarVisibility(true);
      }
    }
  }, [ordreMissions]);

  useEffect(() => {
    if (errorDeletingOrdreMission === false) {
      dispatch(setOrdreMissionStatusAction('deleted'));
      setSnackbarAlertSeverity('danger');
      setSnackbarVisibility(true);
      dispatch(nullifyErrorDeletingOrdreMissionAction());
    }
  }, [errorDeletingOrdreMission]);

  useEffect(
    () => () => {
      dispatch(cleanupOrdreMissionTableStoreAction());
    },
    [],
  );

  // handle table buttons actions
  const handleOnCreateButtonClick = () => {
    dispatch(ChangePageContentAction('ADD'));
  };

  const handleOnEditButtonClick = (id) => {
    dispatch(setOrdreMissionIdentityAction(id));
    dispatch(ChangePageContentAction('EDIT'));
  };

  const handleOnViewButtonClick = (id) => {
    dispatch(setOrdreMissionIdentityAction(id));
    dispatch(ChangePageContentAction('VIEW'));
  };

  const handleOnModifyButtonClick = (id) => {
    dispatch(setOrdreMissionIdentityAction(id));
    dispatch(ChangePageContentAction('MODIFY'));
  };

  const handleOnConfirmDeletionButtonClick = (id) => {
    dispatch(deleteOrdreMissionAction(id));
  };

  const intl = useIntl();
  const tableDescription = intl.formatMessage({
    id: messages.tableDescription.id,
  });
  const tableAbroad = intl.formatMessage({
    id: messages.tableAbroad.id,
  });

  const tableLatestStatus = intl.formatMessage({
    id: messages.tableLatestStatus.id,
  });

  const tableOnBehalf = intl.formatMessage({
    id: messages.tableOnBehalf.id,
  });

  const tableCreatedOn = intl.formatMessage({
    id: messages.tableCreatedOn.id,
  });

  const tableActions = intl.formatMessage({
    id: messages.tableActions.id,
  });

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
      headerName: tableDescription,
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
      field: 'latestStatus',
      hide: false,
      headerName: tableLatestStatus,
      width: 300,
      renderCell: (params) => {
        const { latestStatus } = params.row;
        if (
          latestStatus === 'Draft' ||
          latestStatus === 'Returned' ||
          latestStatus === 'Returned for missing evidences' ||
          latestStatus === 'Funds Prepared'
        ) {
          return (
            <Alert
              icon={false}
              severity="warning"
              variant="outlined"
              style={{
                paddingBottom: '0.3px',
                paddingTop: '0.3px',
                borderRadius: '40px',
              }}
            >
              {latestStatus}
            </Alert>
          );
        }
        if (latestStatus === 'Rejected') {
          return (
            <Alert
              icon={false}
              severity="error"
              variant="outlined"
              style={{
                paddingBottom: '0.3px',
                paddingTop: '0.3px',
                borderRadius: '40px',
              }}
            >
              {latestStatus}
            </Alert>
          );
        }
        if (
          latestStatus === 'Approved' ||
          latestStatus === 'Finalized' ||
          latestStatus === 'Funds Collected'
        ) {
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
              {latestStatus}
            </Alert>
          );
        }
        return (
          <Alert
            icon={false}
            severity="info"
            style={{
              paddingBottom: '0.3px',
              paddingTop: '0.3px',
              borderRadius: '40px',
            }}
          >
            {latestStatus}
          </Alert>
        );
      },
    },
    {
      field: 'onBehalf',
      hide: false,
      type: 'boolean',
      headerName: tableOnBehalf,
      width: 150,
    },
    {
      field: 'abroad',
      hide: false,
      type: 'boolean',
      headerName: tableAbroad,
      width: 150,
    },
    {
      field: 'createDate',
      hide: false,
      headerName: tableCreatedOn,
      width: 200,
      renderCell: (params) => {
        const { createDate } = params.row;
        return (
          <Typography level="title-md" variant="plain">
            {DateTimeFormater(createDate)}
          </Typography>
        );
      },
      // valueFormatter: ({ value }) => DateTimeFormater(value),
    },
    {
      field: '',
      hide: false,
      headerName: tableActions,
      width: 300,
      renderCell: (params) => {
        const { id, latestStatus } = params.row;
        if (latestStatus === 'Draft') {
          return (
            <Box>
              <Button
                variant="contained"
                color="warning"
                sx={{ mr: '10px' }}
                startIcon={<EditIcon />}
                onClick={() => {
                  handleOnEditButtonClick(id);
                }}
              >
                <FormattedMessage id={messages.tableEditButton.id} />
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => {
                  setOrdreMissionToDeleteId(id);
                  setModalVisibility(true);
                }}
              >
                <FormattedMessage id={messages.tableDeleteButton.id} />
              </Button>
            </Box>
          );
        }
        if (
          latestStatus === 'Returned' ||
          latestStatus === 'Returned for missing evidences'
        ) {
          return (
            <Box>
              <Button
                variant="contained"
                color="warning"
                sx={{ mr: '10px' }}
                startIcon={<PriorityHighIcon />}
                onClick={() => {
                  handleOnModifyButtonClick(id);
                }}
              >
                <FormattedMessage id={messages.tableModifyButton.id} />
              </Button>
            </Box>
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
            <FormattedMessage id={messages.tableViewButton.id} />
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
      <Box height={70}>
        <IconButton
          style={{ marginBottom: '100px' }}
          size="small"
          onClick={handleOnCreateButtonClick}
        >
          <AddCircleIcon
            fontSize="large"
            sx={{ color: 'green' }}
          ></AddCircleIcon>
          <h1 style={{ color: 'green', fontSize: '20px' }}>
            <FormattedMessage id={messages.requestButton.id} />
          </h1>
        </IconButton>
      </Box>
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
      <Dialog
        open={modalVisibility}
        keepMounted
        onClose={() => setModalVisibility(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle color="error">
          <FormattedMessage id={messages.dialogHeader.id} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Alert severity="error">
              <FormattedMessage id={messages.dialogDeletionAlert.id} />
            </Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleOnConfirmDeletionButtonClick(ordreMissionToDeleteId);
              setModalVisibility(false);
            }}
            variant="outlined"
            color="error"
          >
            <FormattedMessage id={messages.dialogConfirmButton.id} />
          </Button>
          <Button
            onClick={() => setModalVisibility(false)}
            variant="outlined"
            color="primary"
          >
            <FormattedMessage id={messages.dialogCloseButton.id} />
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        variant="solid"
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
      >
        {statusOrdreMission !== '' && (
          <FormattedMessage id={messages[statusOrdreMission].id} />
        )}
      </Snackbar>
    </Box>
  );
}

OrdreMissionTable.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default OrdreMissionTable;
