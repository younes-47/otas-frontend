/**
 *
 * OrdreMission
 *
 */

import React, { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import AddCircleIcon from '@mui/icons-material/AddCircle';

import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Tables from 'components/Tables';
import { DateTimeFormater } from 'utils/Custom/stringManipulation';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectErrorLoadingOrdreMissions,
  makeSelectLoadingOrdreMissions,
  makeSelectOrdreMissions,
} from './selectors';
import { loadOrdreMissionAction } from './actions';

const mapStateToProps = createStructuredSelector({
  loadingOrdreMissions: makeSelectLoadingOrdreMissions(),
  errorLoadingOrdreMissions: makeSelectErrorLoadingOrdreMissions(),
  ordreMissions: makeSelectOrdreMissions(),
  isSideBarVisible: makeSelectIsSideBarVisible(),
});

export function OrdreMission() {
  useInjectReducer({ key: 'ordreMission', reducer });
  useInjectSaga({ key: 'ordreMission', saga });
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    ordreMissions,
    loadingOrdreMissions,
    errorLoadingOrdreMissions,
    isSideBarVisible,
  } = useSelector(mapStateToProps);

  const ordreMissionColumns = [
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
      field: 'abroad',
      hide: false,
      type: 'boolean',
      headerName: 'Abroad',
      flex: 1,
    },
    // {
    //   field: 'departureDate',
    //   hide: false,
    //   headerName: 'Departure Date',
    //   flex: 1,
    // },
    // {
    //   field: 'returnDate',
    //   hide: false,
    //   headerName: 'Return Date',
    //   flex: 1,
    //   valueFormatter: ({ value }) => DateTimeFormater(value)
    // },
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
      headerName: 'Action',
      flex: 1,
    },
  ];

  const ordreMissionInitialState = {
    columns: {
      columnVisibilityModel: {
        Id: true,
      },
    },
  };

  const handleOnCreateButtonClick = () => {
    history.push('/my-requests/ordre-mission/add');
  };

  useEffect(() => {
    if (errorLoadingOrdreMissions === null) {
      dispatch(loadOrdreMissionAction());
    }
  }, [ordreMissions]);
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
      {!errorLoadingOrdreMissions ? (
        <div style={{ height: '85%', width: '100%' }}>
          <Tables
            getRowId={(row) => row.id}
            disableRowSelectionOnClick
            top={10}
            bottom={10}
            left={0}
            right={0}
            loading={loadingOrdreMissions}
            rows={ordreMissions}
            columns={ordreMissionColumns}
            initialState={ordreMissionInitialState}
          />
        </div>
      ) : (
        <></>
      )}
    </Box>
  );
}

OrdreMission.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default OrdreMission;
