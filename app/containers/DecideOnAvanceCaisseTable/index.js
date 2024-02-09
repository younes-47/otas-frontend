/**
 *
 * DecideOnAvanceCaisseTable
 *
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import EditIcon from '@mui/icons-material/Edit';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { DateTimeFormater } from 'utils/Custom/stringManipulation';
import Box from '@mui/system/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/joy/Snackbar';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import Tables from 'components/Tables';
import CloseIcon from '@mui/icons-material/Close';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import {
  changeDecideOnAvanceCaissePageContentAction,
  setAvanceCaisseIdentityAction,
} from 'pages/DecideOnAvanceCaisse/actions';
import { NumericFormat } from 'react-number-format';
import {
  cleanupDecideOnAvanceCaisseTableStoreAction,
  loadAvanceCaisseAction,
} from './actions';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectAvanceCaisses,
  makeSelectErrorLoadingAvanceCaisses,
  makeSelectLoadingAvanceCaisses,
  makeSelectStatusAvanceCaisse,
} from './selectors';

const mapStateToProps = createStructuredSelector({
  avanceCaisses: makeSelectAvanceCaisses(),
  loadingAvanceCaisses: makeSelectLoadingAvanceCaisses(),
  errorLoadingAvanceCaisses: makeSelectErrorLoadingAvanceCaisses(),
  isSideBarVisible: makeSelectIsSideBarVisible(),
  statusAvanceCaisse: makeSelectStatusAvanceCaisse(),
});

export function DecideOnAvanceCaisseTable() {
  useInjectReducer({ key: 'decideOnAvanceCaisseTable', reducer });
  useInjectSaga({ key: 'decideOnAvanceCaisseTable', saga });
  const dispatch = useDispatch();
  const {
    avanceCaisses,
    loadingAvanceCaisses,
    errorLoadingAvanceCaisses,
    isSideBarVisible,
    statusAvanceCaisse,
  } = useSelector(mapStateToProps);

  const [snackbarVisibility, setSnackbarVisibility] = useState(false);
  const [snackbarAlertSeverity, setSnackbarAlertSeverity] = useState('');

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
      headerName: 'Estimated Total',
      flex: 1,
      renderCell: (params) => {
        const { estimatedTotal } = params.row;
        return (
          <Typography level="title-md" color="success">
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

  const avanceCaisseInitialState = {
    columns: {
      columnVisibilityModel: {
        Id: true,
      },
    },
  };

  useEffect(() => {
    if (errorLoadingAvanceCaisses === null) {
      dispatch(loadAvanceCaisseAction());
      if (statusAvanceCaisse !== '') {
        switch (statusAvanceCaisse) {
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
  }, [avanceCaisses]);

  useEffect(
    () => () => {
      dispatch(cleanupDecideOnAvanceCaisseTableStoreAction());
    },
    [],
  );

  const handleOnDecideButtonClick = (id) => {
    dispatch(setAvanceCaisseIdentityAction(id));
    dispatch(changeDecideOnAvanceCaissePageContentAction('DECIDE'));
  };

  const handleOnViewButtonClick = (id) => {
    dispatch(setAvanceCaisseIdentityAction(id));
    dispatch(changeDecideOnAvanceCaissePageContentAction('VIEW'));
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
        Request has been {statusAvanceCaisse} successfully!
      </Snackbar>
    </Box>
  );
}

DecideOnAvanceCaisseTable.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default DecideOnAvanceCaisseTable;
