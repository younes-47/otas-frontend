/**
 *
 * DecideOnDepenseCaisseTable
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
import Tables from 'components/Tables';
import { Box } from '@mui/system';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import { DateTimeFormater } from 'utils/Custom/stringManipulation';
import {
  makeSelectDepenseCaisses,
  makeSelectErrorLoadingDepenseCaisses,
  makeSelectLoadingDepenseCaisses,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadDepenseCaisseAction } from './actions';

const mapStateToProps = createStructuredSelector({
  depenseCaisses: makeSelectDepenseCaisses(),
  loadingDepenseCaisses: makeSelectLoadingDepenseCaisses(),
  errorLoadingDepenseCaisses: makeSelectErrorLoadingDepenseCaisses(),
  isSideBarVisible: makeSelectIsSideBarVisible(),
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
  } = useSelector(mapStateToProps);

  const depenseCaisseColumns = [
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
      field: 'total',
      hide: false,
      headerName: 'Total',
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
      field: 'receiptsFileName',
      hide: false,
      headerName: 'Receipts File',
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

  const depenseCaisseInitialState = {
    columns: {
      columnVisibilityModel: {
        Id: true,
      },
    },
  };

  useEffect(() => {
    if (errorLoadingDepenseCaisses === null) {
      dispatch(loadDepenseCaisseAction());
    }
  }, [depenseCaisses]);

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
    </Box>
  );
}

DecideOnDepenseCaisseTable.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default DecideOnDepenseCaisseTable;
