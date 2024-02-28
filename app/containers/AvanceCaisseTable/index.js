import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { DateTimeFormater } from 'utils/Custom/stringManipulation';
import Tables from 'components/Tables';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/joy/Snackbar';
import Typography from '@mui/joy/Typography';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import {
  changePageContentAction,
  setAvanceCaisseIdentityAction,
} from 'pages/AvanceCaisse/actions';
import { NumericFormat } from 'react-number-format';
import { FormattedMessage, useIntl } from 'react-intl';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectAvanceCaisses,
  makeSelectLoadingAvanceCaisses,
  makeSelectErrorLoadingAvanceCaisses,
  makeSelectStatusAvanceCaisse,
  makeSelectErrorDeletingAvanceCaisse,
} from './selectors';
import {
  cleanupAvanceCaisseTableStoreAction,
  deleteAvanceCaisseAction,
  loadAvanceCaisseAction,
  nullifyErrorDeletingAvanceCaisseAction,
  setAvanceCaisseStatusAction,
} from './actions';
import messages from './messages';

const mapStateToProps = createStructuredSelector({
  avanceCaisses: makeSelectAvanceCaisses(),
  loadingAvanceCaisses: makeSelectLoadingAvanceCaisses(),
  errorLoadingAvanceCaisses: makeSelectErrorLoadingAvanceCaisses(),
  errorDeletingAvanceCaisse: makeSelectErrorDeletingAvanceCaisse(),
  isSideBarVisible: makeSelectIsSideBarVisible(),
  statusAvanceCaisse: makeSelectStatusAvanceCaisse(),
});

export function AvanceCaisseTable() {
  useInjectReducer({ key: 'avanceCaisseTable', reducer });
  useInjectSaga({ key: 'avanceCaisseTable', saga });
  const dispatch = useDispatch();
  const {
    avanceCaisses,
    loadingAvanceCaisses,
    errorLoadingAvanceCaisses,
    statusAvanceCaisse,
    errorDeletingAvanceCaisse,
    isSideBarVisible,
  } = useSelector(mapStateToProps);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [avanceCaisseToDeleteId, setAvanceCaisseToDeleteId] = useState();
  const [snackbarVisibility, setSnackbarVisibility] = useState(false);
  const [snackbarAlertSeverity, setSnackbarAlertSeverity] = useState('');

  useEffect(() => {
    if (errorLoadingAvanceCaisses === null) {
      dispatch(loadAvanceCaisseAction());
      if (statusAvanceCaisse !== '') {
        switch (statusAvanceCaisse) {
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
  }, [avanceCaisses]);

  useEffect(() => {
    if (errorDeletingAvanceCaisse === false) {
      dispatch(setAvanceCaisseStatusAction('deleted'));
      setSnackbarAlertSeverity('danger');
      setSnackbarVisibility(true);
      dispatch(nullifyErrorDeletingAvanceCaisseAction());
    }
  }, [errorDeletingAvanceCaisse]);

  useEffect(
    () => () => {
      dispatch(cleanupAvanceCaisseTableStoreAction());
    },
    [],
  );

  // handle table buttons actions
  const handleOnCreateButtonClick = () => {
    dispatch(changePageContentAction('ADD'));
  };

  const handleOnEditButtonClick = (id) => {
    dispatch(setAvanceCaisseIdentityAction(id));
    dispatch(changePageContentAction('EDIT'));
  };

  const handleOnViewButtonClick = (id) => {
    dispatch(setAvanceCaisseIdentityAction(id));
    dispatch(changePageContentAction('VIEW'));
  };

  const handleOnModifyButtonClick = (id) => {
    dispatch(setAvanceCaisseIdentityAction(id));
    dispatch(changePageContentAction('MODIFY'));
  };

  const handleOnConfirmDeletionButtonClick = (id) => {
    dispatch(deleteAvanceCaisseAction(id));
  };
  const intl = useIntl();
  const tableDescription = intl.formatMessage({
    id: messages.tableDescription.id,
  });
  const tableEstimatedTotal = intl.formatMessage({
    id: messages.tableEstimatedTotal.id,
  });
  const tableCurrency = intl.formatMessage({
    id: messages.tableCurrency.id,
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

  const avanceCaisseColumns = [
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
      field: 'estimatedTotal',
      hide: false,
      headerName: tableEstimatedTotal,
      flex: 1,
      renderCell: (params) => {
        const { estimatedTotal } = params.row;
        return (
          <Typography color="success" level="title-md" variant="plain">
            <NumericFormat
              displayType="text"
              value={estimatedTotal}
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
            />
          </Typography>
        );
      },
    },
    {
      field: 'currency',
      hide: false,
      headerName: tableCurrency,
      width: 120,
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
      field: 'latestStatus',
      hide: false,
      headerName: tableLatestStatus,
      flex: 1,
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
      width: 120,
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
    },
    {
      field: '',
      hide: false,
      headerName: tableActions,
      flex: 1,
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
                  setAvanceCaisseToDeleteId(id);
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

  const avanceCaisseInitialState = {
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
      {!errorLoadingAvanceCaisses ? (
        <div style={{ height: '85%', width: '100%' }}>
          <Tables
            getRowId={(row) => row.id}
            disableRowSelectionOnClick
            top={10}
            bottom={10}
            left={0}
            right={0}
            loading={loadingAvanceCaisses}
            rows={avanceCaisses}
            columns={avanceCaisseColumns}
            initialState={avanceCaisseInitialState}
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
              handleOnConfirmDeletionButtonClick(avanceCaisseToDeleteId);
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
        {statusAvanceCaisse !== '' && (
          <FormattedMessage id={messages[statusAvanceCaisse].id} />
        )}
      </Snackbar>
    </Box>
  );
}

AvanceCaisseTable.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default AvanceCaisseTable;
