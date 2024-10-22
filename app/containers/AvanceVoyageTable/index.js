/**
 *
 * AvanceVoyage
 *
 */
import React from 'react';
import { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Tables from 'components/Tables';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { DateTimeFormater } from 'utils/Custom/stringManipulation';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import {
  changePageContentAction,
  setAvanceVoyageIdentityAction,
} from 'pages/AvanceVoyage/actions';

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {
  ChangePageContentAction,
  setOrdreMissionIdentityAction,
} from 'pages/OrdreMission/actions';
import { NumericFormat } from 'react-number-format';
import { FormattedMessage, useIntl } from 'react-intl';
import messages from './messages';
import {
  cleanupAvanceVoyageTableStoreAction,
  loadAvanceVoyageAction,
} from './actions';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectErrorLoadingAvanceVoyages,
  makeSelectLoadingAvanceVoyages,
  makeSelectAvanceVoyages,
} from './selectors';

const mapStateToProps = createStructuredSelector({
  avanceVoyages: makeSelectAvanceVoyages(),
  loadingAvanceVoyages: makeSelectLoadingAvanceVoyages(),
  errorLoadingAvanceVoyages: makeSelectErrorLoadingAvanceVoyages(),
  isSideBarVisible: makeSelectIsSideBarVisible(),
});

export function AvanceVoyageTable() {
  useInjectReducer({ key: 'avanceVoyageTable', reducer });
  useInjectSaga({ key: 'avanceVoyageTable', saga });
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    avanceVoyages,
    loadingAvanceVoyages,
    errorLoadingAvanceVoyages,
    isSideBarVisible,
  } = useSelector(mapStateToProps);

  const intl = useIntl();

  const tableDescription = intl.formatMessage({
    id: messages.tableDescription.id,
  });

  const tableMissionOrderId = intl.formatMessage({
    id: messages.tableMissionOrderId.id,
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

  const missionOrderNavigationTooltipTitle = intl.formatMessage({
    id: messages.missionOrderNavigationTooltipTitle.id,
  });

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
      field: 'ordreMissionDescription',
      hide: false,
      flex: 1,
      headerName: tableDescription,
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
      field: 'ordreMissionId',
      hide: false,
      width: 120,
      headerName: tableMissionOrderId,
      renderCell: (params) => {
        const { ordreMissionId } = params.row;
        return (
          <Tooltip
            title={missionOrderNavigationTooltipTitle}
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
      field: 'estimatedTotal',
      hide: false,
      headerName: tableEstimatedTotal,
      width: 150,
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
    },
    {
      field: '',
      hide: false,
      headerName: tableActions,
      flex: 1,
      renderCell: (params) => {
        const { id } = params.row;
        return (
          <Button
            variant="contained"
            color="primary"
            startIcon={<VisibilityIcon />}
            onClick={() => {
              dispatch(setAvanceVoyageIdentityAction(id));
              dispatch(changePageContentAction('VIEW'));
            }}
          >
            <FormattedMessage id={messages.tableViewButton.id} />
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

  useEffect(() => {
    if (errorLoadingAvanceVoyages === null) {
      dispatch(loadAvanceVoyageAction());
    }
  }, [avanceVoyages]);
  useEffect(
    () => () => {
      dispatch(cleanupAvanceVoyageTableStoreAction());
    },
    [],
  );
  const handleOnOrdreMissionIdLinkClick = (ordreMissionId) => {
    dispatch(setOrdreMissionIdentityAction(ordreMissionId));
    dispatch(ChangePageContentAction('VIEW'));
    history.push('/my-requests/ordre-mission');
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
    </Box>
  );
}

AvanceVoyageTable.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default AvanceVoyageTable;
