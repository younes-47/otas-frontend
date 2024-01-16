/**
 *
 * DecideOnLiquidationTable
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
import { DateTimeFormater } from 'utils/Custom/stringManipulation';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import {
  makeSelectErrorLoadingLiquidations,
  makeSelectLiquidations,
  makeSelectLoadingLiquidations,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadLiquidationAction } from './actions';

const mapStateToProps = createStructuredSelector({
  liquidations: makeSelectLiquidations(),
  loadingLiquidations: makeSelectLoadingLiquidations(),
  errorLoadingLiquidations: makeSelectErrorLoadingLiquidations(),
  isSideBarVisible: makeSelectIsSideBarVisible(),
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
  } = useSelector(mapStateToProps);

  const liquidationColumns = [
    {
      field: 'id',
      hide: false,
      width: 20,
      headerName: '#',
    },
    {
      field: 'requestType',
      hide: false,
      headerName: 'Request Type',
      flex: 1,
      renderCell: (params) => {
        const { avanceVoyageId } = params.row;
        return avanceVoyageId !== null ? (
          <div>Avance Voyage</div>
        ) : (
          <div>Avance Caisse</div>
        );
      },
    },
    {
      field: 'requestDescription',
      hide: false,
      headerName: 'Request Description',
      flex: 1,
      renderCell: (params) => {
        const { avanceVoyageDescription, avanceCaisseDescription } = params.row;
        return avanceVoyageDescription !== null ? (
          <div>{avanceVoyageDescription}</div>
        ) : (
          <div>{avanceCaisseDescription}</div>
        );
      },
    },
    {
      field: 'requestId',
      hide: false,
      headerName: '#Request ID',
      flex: 1,
      renderCell: (params) => {
        const { avanceVoyageId, avanceCaisseId } = params.row;
        return avanceVoyageId !== null ? avanceVoyageId : avanceCaisseId;
      },
    },
    {
      field: 'actualTotal',
      hide: false,
      headerName: 'Actual Total',
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

  const liquidationInitialState = {
    columns: {
      columnVisibilityModel: {
        id: true,
      },
    },
  };

  useEffect(() => {
    if (errorLoadingLiquidations === null) {
      dispatch(loadLiquidationAction());
    }
  }, [liquidations]);

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
    </Box>
  );
}

DecideOnLiquidationTable.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default DecideOnLiquidationTable;
