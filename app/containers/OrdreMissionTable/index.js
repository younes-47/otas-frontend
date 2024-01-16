import React, { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { makeSelectIsSideBarVisible } from 'containers/SideBar/selectors';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import Tables from 'components/Tables';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { DateTimeFormater } from 'utils/Custom/stringManipulation';
import EditIcon from '@mui/icons-material/Edit';
import { ChangePageContentAction } from 'pages/OrdreMission/actions';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectErrorLoadingOrdreMissions,
  makeSelectLoadingOrdreMissions,
  makeSelectOrdreMissions,
} from './selectors';
import { deleteOrdreMissionAction, loadOrdreMissionAction } from './actions';
// import makeSelectPageContent from '../../pages/OrdreMission/selectors';

const mapStateToProps = createStructuredSelector({
  loadingOrdreMissions: makeSelectLoadingOrdreMissions(),
  errorLoadingOrdreMissions: makeSelectErrorLoadingOrdreMissions(),
  ordreMissions: makeSelectOrdreMissions(),
  isSideBarVisible: makeSelectIsSideBarVisible(),
  // pageContent: makeSelectPageContent(),
});

export function OrdreMissionTable() {
  useInjectReducer({ key: 'ordreMissionTable', reducer });
  useInjectSaga({ key: 'ordreMissionTable', saga });
  const dispatch = useDispatch();
  const {
    ordreMissions,
    loadingOrdreMissions,
    errorLoadingOrdreMissions,
    isSideBarVisible,
    // pageContent,
  } = useSelector(mapStateToProps);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [ordreMissionToDeleteId, setOrdreMissionToDeleteId] = useState();
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

  const ordreMissionInitialState = {
    columns: {
      columnVisibilityModel: {
        Id: true,
      },
    },
  };

  const handleOnCreateButtonClick = () => {
    dispatch(ChangePageContentAction('ADD'));
  };

  const handleOnConfirmDeletionButtonClick = (id) => {
    dispatch(deleteOrdreMissionAction(id));
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
      <Dialog
        open={modalVisibility}
        keepMounted
        onClose={() => setModalVisibility(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle color="error">
          Are you sure you want to delete this request!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Alert severity="error">
              This will delete all information related to this request. This
              can&apos;t be undone.
            </Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleOnConfirmDeletionButtonClick(ordreMissionToDeleteId);
              setModalVisibility(false);
            }}
            variant="outlined"
            color="error"
          >
            Confirm
          </Button>
          <Button
            onClick={() => setModalVisibility(false)}
            variant="outlined"
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

OrdreMissionTable.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default OrdreMissionTable;
