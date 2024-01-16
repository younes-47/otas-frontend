/**
 *
 * DecideOnAvanceVoyageTable
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

import { Box } from '@mui/system';
import Tables from 'components/Tables';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loadAvanceVoyageAction } from './actions';
import {
  makeSelectAvanceVoyages,
  makeSelectErrorLoadingAvanceVoyages,
  makeSelectLoadingAvanceVoyages,
} from './selectors';

const mapStateToProps = createStructuredSelector({
  avanceVoyages: makeSelectAvanceVoyages(),
  loadingAvanceVoyages: makeSelectLoadingAvanceVoyages(),
  errorLoadingAvanceVoyages: makeSelectErrorLoadingAvanceVoyages(),
  isSideBarVisible: makeSelectIsSideBarVisible(),
});

export function DecideOnAvanceVoyageTable() {
  useInjectReducer({ key: 'decideOnAvanceVoyageTable', reducer });
  useInjectSaga({ key: 'decideOnAvanceVoyageTable', saga });

  const dispatch = useDispatch();
  const {
    avanceVoyages,
    loadingAvanceVoyages,
    errorLoadingAvanceVoyages,
    isSideBarVisible,
  } = useSelector(mapStateToProps);

  const avanceVoyageColumns = [
    {
      field: 'id',
      hide: false,
      width: 20,
      headerName: '#',
    },
    {
      field: 'ordreMissionId',
      hide: false,
      width: 120,
      headerName: '#Mission Order',
    },
    {
      field: 'ordreMissionDescription',
      hide: false,
      width: 250,
      headerName: 'Description',
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
  return (
    <div>
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
    </div>
  );
}

DecideOnAvanceVoyageTable.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default DecideOnAvanceVoyageTable;
