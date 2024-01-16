import React, { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import Tables from 'components/Tables';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import { DateTimeFormater } from 'utils/Custom/stringManipulation';
import { changePageContentAction } from 'pages/DepenseCaisse/actions';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectDepenseCaisses,
  makeSelectErrorLoadingDepenseCaisses,
  makeSelectLoadingDepenseCaisses,
} from './selectors';
import { loadDepenseCaisseAction } from './actions';

const mapStateToProps = createStructuredSelector({
  depenseCaisses: makeSelectDepenseCaisses(),
  loadingDepenseCaisses: makeSelectLoadingDepenseCaisses(),
  errorLoadingDepenseCaisses: makeSelectErrorLoadingDepenseCaisses(),
  isSideBarVisible: makeSelectIsSideBarVisible(),
});

export function DepenseCaisseTable() {
  useInjectReducer({ key: 'depenseCaisseTable', reducer });
  useInjectSaga({ key: 'depenseCaisseTable', saga });
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

  const handleOnCreateButtonClick = () => {
    dispatch(changePageContentAction('ADD'));
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

DepenseCaisseTable.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default DepenseCaisseTable;
