import React, { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDispatch, useSelector } from 'react-redux';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import Tables from 'components/Tables';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import { DateTimeFormater } from 'utils/Custom/stringManipulation';
import {
  changePageContentAction,
  setDepenseCaisseIdentityAction,
} from 'pages/DepenseCaisse/actions';
import CloseIcon from '@mui/icons-material/Close';
import FilePresent from '@mui/icons-material/FilePresent';
import Typography from '@mui/joy/Typography';
import Snackbar from '@mui/joy/Snackbar';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectDepenseCaisseReceiptsFileDownloadResponse,
  makeSelectDepenseCaisses,
  makeSelectErrorDeletingDepenseCaisse,
  makeSelectErrorDownloadingDepenseCaisseReceiptsFile,
  makeSelectErrorLoadingDepenseCaisses,
  makeSelectLoadingDepenseCaisses,
  makeSelectStatusDepenseCaisse,
} from './selectors';
import {
  cleanupDepenseCaisseTableStoreAction,
  deleteDepenseCaisseAction,
  downloadDepenseCaisseReceiptsFileAction,
  loadDepenseCaisseAction,
  nullifyErrorDeletingDepenseCaisseAction,
  setDepenseCaisseStatusAction,
} from './actions';

const mapStateToProps = createStructuredSelector({
  depenseCaisses: makeSelectDepenseCaisses(),
  loadingDepenseCaisses: makeSelectLoadingDepenseCaisses(),
  errorLoadingDepenseCaisses: makeSelectErrorLoadingDepenseCaisses(),
  isSideBarVisible: makeSelectIsSideBarVisible(),
  statusDepenseCaisse: makeSelectStatusDepenseCaisse(),
  errorDeletingDepenseCaisse: makeSelectErrorDeletingDepenseCaisse(),
  errorDownloadingDepenseCaisseReceiptsFile:
    makeSelectErrorDownloadingDepenseCaisseReceiptsFile(),
  downloadDepenseCaisseReceiptsFileResponse:
    makeSelectDepenseCaisseReceiptsFileDownloadResponse(),
});

export function DepenseCaisseTable() {
  useInjectReducer({ key: 'depenseCaisseTable', reducer });
  useInjectSaga({ key: 'depenseCaisseTable', saga });
  const dispatch = useDispatch();
  const {
    depenseCaisses,
    loadingDepenseCaisses,
    errorLoadingDepenseCaisses,
    isSideBarVisible,
    statusDepenseCaisse,
    errorDeletingDepenseCaisse,
    downloadDepenseCaisseReceiptsFileResponse,
    errorDownloadingDepenseCaisseReceiptsFile,
  } = useSelector(mapStateToProps);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [depenseCaisseToDeleteId, setDepenseCaisseToDeleteId] = useState();
  const [snackbarVisibility, setSnackbarVisibility] = useState(false);
  const [snackbarAlertSeverity, setSnackbarAlertSeverity] = useState('');

  // Download file
  useEffect(() => {
    if (errorDownloadingDepenseCaisseReceiptsFile === false) {
      const binaryString = atob(
        downloadDepenseCaisseReceiptsFileResponse.fileContents,
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
      link.download =
        downloadDepenseCaisseReceiptsFileResponse.fileDownloadName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [errorDownloadingDepenseCaisseReceiptsFile]);

  useEffect(() => {
    if (errorLoadingDepenseCaisses === null) {
      dispatch(loadDepenseCaisseAction());
      if (statusDepenseCaisse !== '') {
        switch (statusDepenseCaisse) {
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
  }, [depenseCaisses]);

  useEffect(() => {
    if (errorDeletingDepenseCaisse === false) {
      dispatch(setDepenseCaisseStatusAction('DELETED'));
      setSnackbarAlertSeverity('danger');
      setSnackbarVisibility(true);
      dispatch(nullifyErrorDeletingDepenseCaisseAction());
    }
  }, [errorDeletingDepenseCaisse]);

  useEffect(
    () => () => {
      dispatch(cleanupDepenseCaisseTableStoreAction());
    },
    [],
  );

  // handle buttons
  const handleOnCreateButtonClick = () => {
    dispatch(changePageContentAction('ADD'));
  };
  const handleOnEditButtonClick = (id) => {
    dispatch(setDepenseCaisseIdentityAction(id));
    dispatch(changePageContentAction('EDIT'));
  };
  const handleOnModifyButtonClick = (id) => {
    dispatch(setDepenseCaisseIdentityAction(id));
    dispatch(changePageContentAction('MODIFY'));
  };

  const handleOnViewButtonClick = (id) => {
    dispatch(setDepenseCaisseIdentityAction(id));
    dispatch(changePageContentAction('VIEW'));
  };

  const handleOnConfirmDeletionButtonClick = (id) => {
    dispatch(deleteDepenseCaisseAction(id));
  };

  const handleOnFileIconClick = (fileName) => {
    dispatch(downloadDepenseCaisseReceiptsFileAction(fileName));
  };
  const depenseCaisseColumns = [
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
      field: 'total',
      hide: false,
      width: 150,
      headerName: 'Total',
      renderCell: (params) => {
        const { total } = params.row;
        return (
          <Typography color="success" level="title-md" variant="plain">
            {total.toFixed(2)}
          </Typography>
        );
      },
    },
    {
      field: 'currency',
      hide: false,
      headerName: 'Currency',
      width: 150,
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
      width: 150,
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
      width: 150,
    },
    {
      field: 'receiptsFileName',
      hide: false,
      headerName: 'Receipts File',
      width: 150,
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
                  setDepenseCaisseToDeleteId(id);
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

  const depenseCaisseInitialState = {
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
          <h1 style={{ color: 'green', fontSize: '20px' }}>Request</h1>
        </IconButton>
      </Box>
      {!errorLoadingDepenseCaisses ? (
        <div style={{ height: '85%', width: '100%' }}>
          <Tables
            getRowId={(row) => row.id}
            disableRowSelectionOnClick
            top={10}
            bottom={10}
            left={0}
            right={0}
            loading={loadingDepenseCaisses}
            rows={depenseCaisses}
            columns={depenseCaisseColumns}
            initialState={depenseCaisseInitialState}
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
              This will delete all information related to it. This can&apos;t be
              undone.
            </Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleOnConfirmDeletionButtonClick(depenseCaisseToDeleteId);
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
        color={snackbarAlertSeverity}
      >
        Request has been {statusDepenseCaisse} successfully!
      </Snackbar>
    </Box>
  );
}
DepenseCaisseTable.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default DepenseCaisseTable;
