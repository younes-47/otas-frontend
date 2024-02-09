/**
 *
 * DecideOnLiquidationTable
 *
 */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import CloseIcon from '@mui/icons-material/Close';
import FilePresent from '@mui/icons-material/FilePresent';
import Typography from '@mui/joy/Typography';
import Snackbar from '@mui/joy/Snackbar';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Tables from 'components/Tables';

import { DateTimeFormater } from 'utils/Custom/stringManipulation';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from '@mui/joy';
import { NumericFormat } from 'react-number-format';
import {
  changeDecideOnAvanceCaissePageContentAction,
  setAvanceCaisseIdentityAction,
} from 'pages/DecideOnAvanceCaisse/actions';
import {
  changeDecideOnAvanceVoyagePageContentAction,
  setAvanceVoyageIdentityAction,
} from 'pages/DecideOnAvanceVoyage/actions';
import {
  changeDecideOnLiquidationParentPageContent,
  setLiquidationIdentityAction,
} from 'pages/DecideOnLiquidation/actions';
import {
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
  downloadLiquidationReceiptsFileAction,
  loadLiquidationAction,
} from './actions';

const mapStateToProps = createStructuredSelector({
  liquidations: makeSelectLiquidations(),
  loadingLiquidations: makeSelectLoadingLiquidations(),
  errorLoadingLiquidations: makeSelectErrorLoadingLiquidations(),
  isSideBarVisible: makeSelectIsSideBarVisible(),
  statusLiquidation: makeSelectStatusLiquidation(),
  errorDownloadingLiquidationReceiptsFile:
    makeSelectErrorDownloadingLiquidationReceiptsFile(),
  downloadLiquidationReceiptsFileResponse:
    makeSelectLiquidationReceiptsFileDownloadResponse(),
});

export function DecideOnLiquidationTable() {
  useInjectReducer({ key: 'decideOnLiquidationTable', reducer });
  useInjectSaga({ key: 'decideOnLiquidationTable', saga });

  const dispatch = useDispatch();
  const {
    liquidations,
    loadingLiquidations,
    errorLoadingLiquidations,
    isSideBarVisible,
    statusLiquidation,
    errorDownloadingLiquidationReceiptsFile,
    downloadLiquidationReceiptsFileResponse,
  } = useSelector(mapStateToProps);

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
      headerName: 'Request Description',
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
      headerName: 'Actual Total',
      width: 120,
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
      valueFormatter: ({ value }) => DateTimeFormater(value),
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

  const liquidationInitialState = {
    columns: {
      columnVisibilityModel: {
        id: true,
      },
    },
  };

  const handleOnDecideButtonClick = (id) => {
    dispatch(setLiquidationIdentityAction(id));
    dispatch(changeDecideOnLiquidationParentPageContent('DECIDE'));
  };

  const handleOnViewButtonClick = (id) => {
    dispatch(setLiquidationIdentityAction(id));
    dispatch(changeDecideOnLiquidationParentPageContent('VIEW'));
  };

  const handleOnFileIconClick = (fileName) => {
    dispatch(downloadLiquidationReceiptsFileAction(fileName));
  };

  const handleOnAvanceVoyageIdLinkClick = (avanceVoyageId) => {
    dispatch(setAvanceVoyageIdentityAction(avanceVoyageId));
    dispatch(changeDecideOnAvanceVoyagePageContentAction('VIEW'));
    history.push('/decide-on-requests/decide-on-avance-voyage');
  };

  const handleOnAvanceCaisseIdLinkClick = (avanceCaisseId) => {
    dispatch(setAvanceCaisseIdentityAction(avanceCaisseId));
    dispatch(changeDecideOnAvanceCaissePageContentAction('VIEW'));
    history.push('/decide-on-requests/decide-on-avance-caisse');
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

DecideOnLiquidationTable.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default DecideOnLiquidationTable;
