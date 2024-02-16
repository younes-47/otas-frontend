/**
 *
 * LiquidationTable
 *
 */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import FilePresent from '@mui/icons-material/FilePresent';
import Typography from '@mui/joy/Typography';
import Snackbar from '@mui/joy/Snackbar';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Tables from 'components/Tables';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import { DateTimeFormater } from 'utils/Custom/stringManipulation';
import {
  changeLiquidationParentPageContentAction,
  setLiquidationIdentityAction,
} from 'pages/Liquidation/actions';
import { NumericFormat } from 'react-number-format';
import Link from '@mui/joy/Link';
import {
  changePageContentAction,
  setAvanceVoyageIdentityAction,
} from 'pages/AvanceVoyage/actions';
import {
  changePageContentAction as changeAvanceCaisseParentPageContentAction,
  setAvanceCaisseIdentityAction,
} from 'pages/AvanceCaisse/actions';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {
  makeSelectErrorDeletingLiquidation,
  makeSelectErrorDownloadingLiquidationReceiptsFile,
  makeSelectErrorLoadingLiquidations,
  makeSelectLiquidationReceiptsFileDownloadResponse,
  makeSelectLiquidations,
  makeSelectLoadingLiquidations,
  makeSelectStatusLiquidation,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  cleanupLiquidationTableStoreAction,
  deleteLiquidationAction,
  downloadLiquidationReceiptsFileAction,
  loadLiquidationAction,
  nullifyErrorDeletingLiquidationAction,
  setLiquidationStatusAction,
} from './actions';

const mapStateToProps = createStructuredSelector({
  liquidations: makeSelectLiquidations(),
  loadingLiquidations: makeSelectLoadingLiquidations(),
  errorLoadingLiquidations: makeSelectErrorLoadingLiquidations(),
  isSideBarVisible: makeSelectIsSideBarVisible(),
  statusLiquidation: makeSelectStatusLiquidation(),
  errorDeletingLiquidation: makeSelectErrorDeletingLiquidation(),
  errorDownloadingLiquidationReceiptsFile:
    makeSelectErrorDownloadingLiquidationReceiptsFile(),
  downloadLiquidationReceiptsFileResponse:
    makeSelectLiquidationReceiptsFileDownloadResponse(),
});

export function LiquidationTable() {
  useInjectReducer({ key: 'liquidationTable', reducer });
  useInjectSaga({ key: 'liquidationTable', saga });

  const dispatch = useDispatch();
  const {
    liquidations,
    loadingLiquidations,
    errorLoadingLiquidations,
    isSideBarVisible,
    statusLiquidation,
    errorDeletingLiquidation,
    downloadLiquidationReceiptsFileResponse,
    errorDownloadingLiquidationReceiptsFile,
  } = useSelector(mapStateToProps);

  const [modalVisibility, setModalVisibility] = useState(false);
  const [liquidationToDeleteId, setLiquidationToDeleteId] = useState();
  const [snackbarVisibility, setSnackbarVisibility] = useState(false);
  const [snackbarAlertSeverity, setSnackbarAlertSeverity] = useState('');
  const history = useHistory();
  // Download file
  useEffect(() => {
    if (errorDownloadingLiquidationReceiptsFile === false) {
      const binaryString = atob(
        downloadLiquidationReceiptsFileResponse.fileContents,
      );
      const bytes = new Uint8Array(binaryString.length);

      for (let i = 0; i < binaryString.length; i += 1) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([bytes.buffer], {
        type: 'application/pdf',
      });

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = downloadLiquidationReceiptsFileResponse.fileDownloadName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [errorDownloadingLiquidationReceiptsFile]);

  // Notifications
  useEffect(() => {
    if (errorLoadingLiquidations === null) {
      dispatch(loadLiquidationAction());
      if (statusLiquidation !== '') {
        switch (statusLiquidation) {
          case 'SAVED':
            setSnackbarAlertSeverity('primary');
            break;
          case 'UPDATED':
            setSnackbarAlertSeverity('primary');
            break;
          default:
            setSnackbarAlertSeverity('success');
        }
        setSnackbarVisibility(true);
      }
    }
  }, [liquidations]);

  // delete action + notif
  useEffect(() => {
    if (errorDeletingLiquidation === false) {
      dispatch(setLiquidationStatusAction('DELETED'));
      setSnackbarAlertSeverity('danger');
      setSnackbarVisibility(true);
      dispatch(nullifyErrorDeletingLiquidationAction());
    }
  }, [errorDeletingLiquidation]);

  // load table
  useEffect(() => {
    if (errorLoadingLiquidations === null) {
      dispatch(loadLiquidationAction());
    }
  }, [liquidations]);

  // cleanup store
  useEffect(
    () => () => {
      dispatch(cleanupLiquidationTableStoreAction());
    },
    [],
  );

  const liquidationColumns = [
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
      field: 'requestType',
      hide: false,
      headerName: 'Request Type',
      flex: 1,
      renderCell: (params) => {
        const { requestType, requestId } = params.row;
        return requestType === 'AV' ? (
          <Typography level="title-md" variant="plain">
            Avance Voyage&nbsp;-&nbsp;
            <Tooltip
              title="Navigate to the related Avance Voyage"
              placement="bottom-start"
            >
              <Typography level="title-md" variant="plain">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <Link
                  level="title-sm"
                  underline="always"
                  onClick={() => handleOnAvanceVoyageIdLinkClick(requestId)}
                >
                  #{requestId}&nbsp;
                  <InsertLinkIcon fontSize="small" />
                </Link>
              </Typography>
            </Tooltip>
          </Typography>
        ) : (
          <Typography level="title-md" variant="plain">
            Avance Caisse&nbsp;-&nbsp;
            <Tooltip
              title="Navigate to the related Avance Caisse"
              placement="bottom-start"
            >
              <Typography level="title-md" variant="plain">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <Link
                  level="title-sm"
                  underline="always"
                  onClick={() => handleOnAvanceCaisseIdLinkClick(requestId)}
                >
                  #{requestId}&nbsp;
                  <InsertLinkIcon fontSize="small" />
                </Link>
              </Typography>
            </Tooltip>
          </Typography>
        );
      },
    },
    {
      field: 'requestDescription',
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
      field: 'actualTotal',
      hide: false,
      width: 120,
      headerName: 'Actual Total',
      renderCell: (params) => {
        const { actualTotal } = params.row;
        return (
          <Typography color="success" level="title-md" variant="plain">
            <NumericFormat
              displayType="text"
              value={actualTotal}
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
      headerName: 'Currency',
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
      headerName: 'Latest Status',
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
      headerName: 'onBehalf',
      width: 120,
    },
    {
      field: 'receiptsFileName',
      hide: false,
      headerName: 'Receipts File',
      width: 120,
      renderCell: (params) => {
        const { receiptsFileName } = params.row;
        return (
          <IconButton onClick={() => handleOnFileIconClick(receiptsFileName)}>
            <FilePresent color="warning" fontSize="large"></FilePresent>
          </IconButton>
        );
      },
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
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => {
                  setLiquidationToDeleteId(id);
                  setModalVisibility(true);
                }}
              >
                Delete
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
                Modify
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
            View
          </Button>
        );
      },
    },
  ];

  const liquidationInitialState = {
    columns: {
      columnVisibilityModel: {
        id: true,
      },
    },
  };

  // handle buttons
  const handleOnCreateButtonClick = () => {
    dispatch(changeLiquidationParentPageContentAction('ADD'));
  };
  const handleOnEditButtonClick = (id) => {
    dispatch(setLiquidationIdentityAction(id));
    dispatch(changeLiquidationParentPageContentAction('EDIT'));
  };
  const handleOnModifyButtonClick = (id) => {
    dispatch(setLiquidationIdentityAction(id));
    dispatch(changeLiquidationParentPageContentAction('MODIFY'));
  };

  const handleOnViewButtonClick = (id) => {
    dispatch(setLiquidationIdentityAction(id));
    dispatch(changeLiquidationParentPageContentAction('VIEW'));
  };

  const handleOnConfirmDeletionButtonClick = (id) => {
    dispatch(deleteLiquidationAction(id));
  };

  const handleOnFileIconClick = (fileName) => {
    dispatch(downloadLiquidationReceiptsFileAction(fileName));
  };

  const handleOnAvanceVoyageIdLinkClick = (avanceVoyageId) => {
    dispatch(setAvanceVoyageIdentityAction(avanceVoyageId));
    dispatch(changePageContentAction('VIEW'));
    history.push('/my-requests/avance-voyage');
  };

  const handleOnAvanceCaisseIdLinkClick = (avanceCaisseId) => {
    dispatch(setAvanceCaisseIdentityAction(avanceCaisseId));
    dispatch(changeAvanceCaisseParentPageContentAction('VIEW'));
    history.push('/my-requests/avance-caisse');
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
          <h1 style={{ color: 'green', fontSize: '20px' }}>Request</h1>
        </IconButton>
      </Box>
      {!errorLoadingLiquidations ? (
        <div style={{ height: '85%', width: '100%' }}>
          <Tables
            getRowId={(row) => row.id}
            disableRowSelectionOnClick
            top={10}
            bottom={10}
            left={0}
            right={0}
            loading={loadingLiquidations}
            rows={liquidations}
            columns={liquidationColumns}
            initialState={liquidationInitialState}
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
          Are you sure you want to delete this request!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Alert severity="error">
              This will delete all information you previously filled. This
              can&apos;t be undone.
            </Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleOnConfirmDeletionButtonClick(liquidationToDeleteId);
              setModalVisibility(false);
            }}
            variant="outlined"
            color="error"
          >
            Confirm
          </Button>
          <Button
            onClick={() => setModalVisibility(false)}
            variant="outlined"
            color="primary"
          >
            Close
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
        Request has been {statusLiquidation} successfully!
      </Snackbar>
    </Box>
  );
}

LiquidationTable.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default LiquidationTable;
