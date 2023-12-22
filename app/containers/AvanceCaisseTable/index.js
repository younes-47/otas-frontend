import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { DateTimeFormater } from 'utils/Custom/stringManipulation';
import Tables from 'components/Tables';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import { changePageContentAction } from 'pages/AvanceCaisse/actions';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectAvanceCaisses,
  makeSelectLoadingAvanceCaisses,
  makeSelectErrorLoadingAvanceCaisses,
} from './selectors';
import { loadAvanceCaisseAction } from './actions';

const mapStateToProps = createStructuredSelector({
  avanceCaisses: makeSelectAvanceCaisses(),
  loadingAvanceCaisses: makeSelectLoadingAvanceCaisses(),
  errorLoadingAvanceCaisses: makeSelectErrorLoadingAvanceCaisses(),
  isSideBarVisible: makeSelectIsSideBarVisible(),
});

export function AvanceCaisseTable() {
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
  ];

  const avanceCaisseInitialState = {
    columns: {
      columnVisibilityModel: {
        Id: true,
      },
    },
  };

  const handleOnCreateButtonClick = () => {
    dispatch(changePageContentAction('ADD'));
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
      <Box height={70}>
        <IconButton
          style={{ marginBottom: '100px' }}
          size="small"
          onClick={handleOnCreateButtonClick}
        >
          <AddCircleIcon
            fontSize="large"
            sx={{ color: 'green' }}
          ></AddCircleIcon>
          <h1 style={{ color: 'green', fontSize: '20px' }}>Request</h1>
        </IconButton>
      </Box>
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

AvanceCaisseTable.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default AvanceCaisseTable;
