/**
 *
 * DecideOnAvanceVoyageTable
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import Tables from 'components/Tables';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/joy/Link';
import Snackbar from '@mui/joy/Snackbar';
import Typography from '@mui/joy/Typography';
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
import { NumericFormat } from 'react-number-format';
import { FormattedMessage, useIntl } from 'react-intl';
import reducer from './reducer';
import saga from './saga';
import {
  cleanupDecideOnAvanceVoyageTableStoreAction,
  loadAvanceVoyageAction,
} from './actions';
import {
  makeSelectAvanceVoyages,
  makeSelectErrorLoadingAvanceVoyages,
  makeSelectLoadingAvanceVoyages,
  makeSelectStatusAvanceVoyage,
} from './selectors';
import messages from './messages';

const mapStateToProps = createStructuredSelector({
  avanceVoyages: makeSelectAvanceVoyages(),
  loadingAvanceVoyages: makeSelectLoadingAvanceVoyages(),
  errorLoadingAvanceVoyages: makeSelectErrorLoadingAvanceVoyages(),
  isSideBarVisible: makeSelectIsSideBarVisible(),
  statusAvanceVoyage: makeSelectStatusAvanceVoyage(),
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
    statusAvanceVoyage,
  } = useSelector(mapStateToProps);

  const [snackbarVisibility, setSnackbarVisibility] = useState(false);
  const [snackbarAlertSeverity, setSnackbarAlertSeverity] = useState('');

  const intl = useIntl();

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
      headerName: intl.formatMessage({
        id: messages.tableOrdreMissionId.id,
      }),
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
      headerName: intl.formatMessage({
        id: messages.tableDescription.id,
      }),
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
      headerName: intl.formatMessage({
        id: messages.tableRequestedAmount.id,
      }),
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
      headerName: intl.formatMessage({
        id: messages.tableCurrency.id,
      }),
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
      headerName: intl.formatMessage({
        id: messages.tableStatus.id,
      }),
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
              <AutorenewIcon fontSize="small" />{' '}
              <FormattedMessage id={messages.tablePending.id} />
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
            <BeenhereIcon fontSize="small" />{' '}
            <FormattedMessage id={messages.tableDecidedUpon.id} />
          </Alert>
        );
      },
    },
    {
      field: 'onBehalf',
      hide: false,
      type: 'boolean',
      headerName: intl.formatMessage({
        id: messages.tableOnBehalf.id,
      }),
      flex: 1,
    },
    {
      field: 'createDate',
      hide: false,
      headerName: intl.formatMessage({
        id: messages.tableCreatedOn.id,
      }),
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
      headerName: intl.formatMessage({
        id: messages.tableActions.id,
      }),
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
              <FormattedMessage id={messages.tableDecideButton.id} />
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
      if (statusAvanceVoyage !== '') {
        switch (statusAvanceVoyage) {
          case 'signedAndApproved':
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
        {statusAvanceVoyage !== '' && (
          <FormattedMessage id={messages[statusAvanceVoyage].id} />
        )}
      </Snackbar>
    </Box>
  );
}

DecideOnAvanceVoyageTable.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default DecideOnAvanceVoyageTable;
