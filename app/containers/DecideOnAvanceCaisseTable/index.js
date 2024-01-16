/**
 *
 * DecideOnAvanceCaisseTable
 *
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';

import { DateTimeFormater } from 'utils/Custom/stringManipulation';
import { changePageContentAction } from 'pages/AvanceCaisse/actions';
import { Box } from '@mui/system';
import { Button, IconButton } from '@mui/material';
import Tables from 'components/Tables';
import { makeSelectUserInfo } from 'pages/MyRequests/selectors';
import { loadUserInfoAction } from 'pages/MyRequests/actions';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import { loadAvanceCaisseAction } from './actions';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectAvanceCaisses,
  makeSelectErrorLoadingAvanceCaisses,
  makeSelectLoadingAvanceCaisses,
} from './selectors';

const mapStateToProps = createStructuredSelector({
  userInfo: makeSelectUserInfo(),
  avanceCaisses: makeSelectAvanceCaisses(),
  loadingAvanceCaisses: makeSelectLoadingAvanceCaisses(),
  errorLoadingAvanceCaisses: makeSelectErrorLoadingAvanceCaisses(),
  isSideBarVisible: makeSelectIsSideBarVisible(),
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
  } = useSelector(mapStateToProps);
  const avanceCaisseColumns = [
    {
      field: 'id',
      hide: false,
      width: 20,
      headerName: '#',
    },
    {
      field: 'description',
      hide: false,
      headerName: 'Description',
      flex: 1,
    },
    {
      field: 'estimatedTotal',
      hide: false,
      headerName: 'Estimated Total',
      flex: 1,
    },
    {
      field: 'currency',
      hide: false,
      headerName: 'Currency',
      flex: 1,
    },

    {
      field: 'latestStatus',
      hide: false,
      headerName: 'Latest Status',
      flex: 1,
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
      valueFormatter: ({ value }) => DateTimeFormater(value),
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
              >
                Edit
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
                startIcon={<EditIcon />}
              >
                Edit
              </Button>
            </Box>
          );
        }
        return (
          <Button
            variant="contained"
            color="primary"
            startIcon={<VisibilityIcon />}
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
    }
  }, [avanceCaisses]);

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
    </Box>
  );
}

DecideOnAvanceCaisseTable.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default DecideOnAvanceCaisseTable;
