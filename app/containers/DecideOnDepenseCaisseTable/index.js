/**
 *
 * DecideOnDepenseCaisseTable
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { DateTimeFormater } from 'utils/Custom/stringManipulation';
import CloseIcon from '@mui/icons-material/Close';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Snackbar from '@mui/joy/Snackbar';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import Box from '@mui/system/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tables from 'components/Tables';
import FilePresent from '@mui/icons-material/FilePresent';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import {
  changeDecideOnDepenseCaissePageContentAction,
  setDepenseCaisseIdentityAction,
} from 'pages/DecideOnDepenseCaisse/actions';
import { NumericFormat } from 'react-number-format';
import {
  makeSelectDepenseCaisseReceiptsFileDownloadResponse,
  makeSelectDepenseCaisses,
  makeSelectErrorDownloadingDepenseCaisseReceiptsFile,
  makeSelectErrorLoadingDepenseCaisses,
  makeSelectLoadingDepenseCaisses,
  makeSelectStatusDepenseCaisse,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  cleanupDecideOnDepenseCaisseTableStoreAction,
  downloadDepenseCaisseReceiptsFileAction,
  loadDepenseCaisseAction,
} from './actions';

const mapStateToProps = createStructuredSelector({
  depenseCaisses: makeSelectDepenseCaisses(),
  loadingDepenseCaisses: makeSelectLoadingDepenseCaisses(),
  errorLoadingDepenseCaisses: makeSelectErrorLoadingDepenseCaisses(),
  isSideBarVisible: makeSelectIsSideBarVisible(),
  statusDepenseCaisse: makeSelectStatusDepenseCaisse(),
  errorDownloadingDepenseCaisseReceiptsFile:
    makeSelectErrorDownloadingDepenseCaisseReceiptsFile(),
  downloadDepenseCaisseReceiptsFileResponse:
    makeSelectDepenseCaisseReceiptsFileDownloadResponse(),
});

export function DecideOnDepenseCaisseTable() {
  useInjectReducer({ key: 'decideOnDepenseCaisseTable', reducer });
  useInjectSaga({ key: 'decideOnDepenseCaisseTable', saga });

  const dispatch = useDispatch();
  const {
    depenseCaisses,
    loadingDepenseCaisses,
    errorLoadingDepenseCaisses,
    isSideBarVisible,
    errorDownloadingDepenseCaisseReceiptsFile,
    downloadDepenseCaisseReceiptsFileResponse,
    statusDepenseCaisse,
  } = useSelector(mapStateToProps);

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
  }, [depenseCaisses]);

  useEffect(
    () => () => {
      dispatch(cleanupDecideOnDepenseCaisseTableStoreAction());
    },
    [],
  );

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
      field: 'total',
      hide: false,
      headerName: 'Total',
      flex: 1,
      renderCell: (params) => {
        const { total } = params.row;
        return (
          <Typography level="title-md" color="success">
            <NumericFormat
              displayType="text"
              value={total}
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

  const depenseCaisseInitialState = {
    columns: {
      columnVisibilityModel: {
        Id: true,
      },
    },
  };

  const handleOnDecideButtonClick = (id) => {
    dispatch(setDepenseCaisseIdentityAction(id));
    dispatch(changeDecideOnDepenseCaissePageContentAction('DECIDE'));
  };

  const handleOnViewButtonClick = (id) => {
    dispatch(setDepenseCaisseIdentityAction(id));
    dispatch(changeDecideOnDepenseCaissePageContentAction('VIEW'));
  };

  const handleOnFileIconClick = (fileName) => {
    dispatch(downloadDepenseCaisseReceiptsFileAction(fileName));
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
        color={snackbarAlertSeverity}
        variant="solid"
      >
        Request has been {statusDepenseCaisse} successfully!
      </Snackbar>
    </Box>
  );
}

DecideOnDepenseCaisseTable.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default DecideOnDepenseCaisseTable;
