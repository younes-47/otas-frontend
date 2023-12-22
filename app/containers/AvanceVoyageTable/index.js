/**
 *
 * AvanceVoyage
 *
 */
import React from 'react';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Tables from 'components/Tables';
import { useEffect } from 'react';
import { DateTimeFormater } from 'utils/Custom/stringManipulation';
import { loadAvanceVoyageAction } from './actions';
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
